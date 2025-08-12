import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { BusRoute, BusLocation, Coordinates } from '../types/bus';

// MapTiler style URL with API key
const getMapStyle = (apiKey: string) => 
  `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`;

interface UseMapLibreProps {
  route: BusRoute;
  busLocation: BusLocation;
  selectedStopId: string | null;
}

export const useMapLibre = ({ route, busLocation, selectedStopId }: UseMapLibreProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const busMarker = useRef<maplibregl.Marker | null>(null);
  const stopMarkers = useRef<maplibregl.Marker[]>([]);
  const userMarker = useRef<maplibregl.Marker | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    if (!apiKey) {
      console.error('MapTiler API key not found. Please add VITE_MAPTILER_API_KEY to your .env file');
      return;
    }

    // TODO: Replace these mock coordinates with real campus coordinates from backend
    const campusCenter: Coordinates = {
      lat: 40.7589, // Mock university coordinates - replace with actual campus center
      lng: -73.9851
    };

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: getMapStyle(apiKey),
      center: [campusCenter.lng, campusCenter.lat],
      zoom: 16,
      pitch: 60, // 3D tilt enabled by default
      bearing: 0,
      antialias: true,
      maxPitch: 85,
      minZoom: 10,
      maxZoom: 20
    });

    // Add navigation controls for 3D interaction
    map.current.addControl(new maplibregl.NavigationControl({
      visualizePitch: true,
      showZoom: true,
      showCompass: true
    }), 'top-right');

    // Add scale control
    map.current.addControl(new maplibregl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-left');

    // Handle map load event
    map.current.on('load', () => {
      setIsMapLoaded(true);
      if (map.current) {
        // Add 3D buildings layer for enhanced visualization
        map.current.addLayer({
          id: '3d-buildings',
          source: 'openmaptiles',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'render_height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'render_min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        });

        // TODO: Add route line from backend route data
        addRouteToMap();
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add route line to map
  const addRouteToMap = () => {
    if (!map.current || !route.stops.length || !isMapLoaded) return;

    // TODO: Replace with actual route coordinates from backend
    const routeCoordinates = route.stops.map(stop => [stop.coordinates.lng, stop.coordinates.lat]);

    // Remove existing route if it exists
    if (map.current.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }

    map.current.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoordinates
        }
      }
    });

    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3b82f6',
        'line-width': 4,
        'line-opacity': 0.8
      }
    });
  };

  // Update bus marker position
  useEffect(() => {
    if (!map.current || !route.stops.length || !isMapLoaded) return;

    const currentStop = route.stops[busLocation.currentStopIndex];
    if (!currentStop) return;

    // Remove existing bus marker
    if (busMarker.current) {
      busMarker.current.remove();
    }

    // Create 3D bus icon element
    const busElement = document.createElement('div');
    busElement.className = 'bus-marker';
    busElement.innerHTML = `
      <div class="bus-3d">
        <div class="bus-body">
          <div class="bus-windows"></div>
          <div class="bus-door"></div>
          <div class="bus-number">101</div>
        </div>
        <div class="bus-wheels">
          <div class="wheel wheel-front"></div>
          <div class="wheel wheel-back"></div>
        </div>
      </div>
    `;

    // TODO: Replace currentStop.coordinates with real-time bus coordinates from backend
    busMarker.current = new maplibregl.Marker(busElement)
      .setLngLat([currentStop.coordinates.lng, currentStop.coordinates.lat])
      .addTo(map.current);

    // Animate to bus location with 3D perspective
    map.current.flyTo({
      center: [currentStop.coordinates.lng, currentStop.coordinates.lat],
      zoom: 17,
      pitch: 60,
      duration: 2000
    });
  }, [busLocation, route.stops, isMapLoaded]);

  // Update stop markers
  useEffect(() => {
    if (!map.current || !route.stops.length || !isMapLoaded) return;

    // Remove existing stop markers
    stopMarkers.current.forEach(marker => marker.remove());
    stopMarkers.current = [];

    // Add stop markers
    route.stops.forEach((stop) => {
      const isSelected = stop.id === selectedStopId;
      const isCurrent = stop.id === route.stops[busLocation.currentStopIndex]?.id;

      const stopElement = document.createElement('div');
      stopElement.className = `stop-marker ${isSelected ? 'selected' : ''} ${isCurrent ? 'current' : ''}`;
      stopElement.innerHTML = `
        <div class="stop-icon">
          <div class="stop-pole"></div>
          <div class="stop-sign">
            <span>${stop.name}</span>
          </div>
        </div>
      `;

      const marker = new maplibregl.Marker(stopElement)
        .setLngLat([stop.coordinates.lng, stop.coordinates.lat])
        .addTo(map.current!);

      stopMarkers.current.push(marker);
    });
  }, [route.stops, selectedStopId, busLocation.currentStopIndex, isMapLoaded]);

  // Get user location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(coords);

          // Add user location marker
          if (map.current && isMapLoaded) {
            // Remove existing user marker
            if (userMarker.current) {
              userMarker.current.remove();
            }

            const userElement = document.createElement('div');
            userElement.className = 'user-marker';
            userElement.innerHTML = `
              <div class="user-location">
                <div class="user-dot"></div>
                <div class="user-pulse"></div>
              </div>
            `;

            userMarker.current = new maplibregl.Marker(userElement)
              .setLngLat([coords.lng, coords.lat])
              .addTo(map.current);
          }
        },
        (error) => {
          console.warn('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
  }, [isMapLoaded]);

  // Add connection line when stop is selected
  useEffect(() => {
    if (!map.current || !selectedStopId || !isMapLoaded) return;

    const selectedStop = route.stops.find(stop => stop.id === selectedStopId);
    const currentStop = route.stops[busLocation.currentStopIndex];

    if (!selectedStop || !currentStop || selectedStop.id === currentStop.id) {
      // Remove connection line if exists
      if (map.current.getSource('connection-line')) {
        map.current.removeLayer('connection-line');
        map.current.removeSource('connection-line');
      }
      return;
    }

    // Remove existing connection line
    if (map.current.getSource('connection-line')) {
      map.current.removeLayer('connection-line');
      map.current.removeSource('connection-line');
    }

    // Add connection line
    map.current.addSource('connection-line', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [currentStop.coordinates.lng, currentStop.coordinates.lat],
            [selectedStop.coordinates.lng, selectedStop.coordinates.lat]
          ]
        }
      }
    });

    map.current.addLayer({
      id: 'connection-line',
      type: 'line',
      source: 'connection-line',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#ef4444',
        'line-width': 3,
        'line-dasharray': [2, 2],
        'line-opacity': 0.8
      }
    });
  }, [selectedStopId, route.stops, busLocation.currentStopIndex, isMapLoaded]);

  return {
    mapContainer,
    userLocation,
    map: map.current,
    isMapLoaded
  };
};