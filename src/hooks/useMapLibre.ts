// FILE: src/hooks/useMapLibre.ts
// Updated to include a function for locating the bus.

import { useRef, useEffect, useState, useCallback } from 'react';
import maplibregl, { Map, Marker } from 'maplibre-gl';
import { BusRoute, BusLocation, Coordinates } from '../types/bus';

interface UseMapLibreProps {
  route: BusRoute;
  busLocation: BusLocation;
  selectedStopId: string | null;
}

// Read the API key from Vite's environment variables
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

export const useMapLibre = ({ route, busLocation, selectedStopId }: UseMapLibreProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const busMarkerRef = useRef<Marker | null>(null);
  const userMarkerRef = useRef<Marker | null>(null); // Ref for the user marker
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  // Effect for initializing the map instance
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    if (!MAPTILER_API_KEY) {
      console.error("MapTiler API key is missing. Ensure it's set in your GitHub Secrets as VITE_MAPTILER_API_KEY.");
      return;
    }

    const initialCoords = route.stops[0].coordinates;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`,
      center: [initialCoords.lng, initialCoords.lat],
      zoom: 14,
      pitch: 45,
      bearing: -17.6,
    });

    map.current.on('load', () => {
      setIsMapLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [route]);

  // This is the button's click handler for relocating the user
  const handleRelocate = useCallback(() => {
    if (!isMapLoaded || !map.current || !navigator.geolocation) {
      console.log("Map not loaded or geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userCoords: Coordinates = { lat: latitude, lng: longitude };
        
        setUserLocation(userCoords);

        // Update or create the user marker
        if (userMarkerRef.current) {
            userMarkerRef.current.setLngLat([userCoords.lng, userCoords.lat]);
        } else {
            const el = document.createElement('div');
            el.className = 'user-marker';
            userMarkerRef.current = new Marker({ element: el })
              .setLngLat([userCoords.lng, userCoords.lat])
              .addTo(map.current!);
        }

        // --- Animation Sequence ---
        try {
          await map.current?.flyTo({ zoom: 5, duration: 2000 });
          await new Promise(resolve => setTimeout(resolve, 1000));
          await map.current?.flyTo({
            center: [userCoords.lng, userCoords.lat],
            zoom: 15,
            duration: 2500,
            essential: true,
          });
        } catch (error) {
          console.log("Animation was interrupted.");
        }
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  }, [isMapLoaded]);

  // --- NEW --- This is the button's click handler for locating the bus
  const handleLocateBus = useCallback(() => {
    if (!isMapLoaded || !map.current || !busLocation) {
      console.log("Map not loaded or bus location not available.");
      return;
    }

    const busCoords: [number, number] = [busLocation.coordinates.lng, busLocation.coordinates.lat];

    try {
      map.current?.flyTo({
        center: busCoords,
        zoom: 16, // Zoom in a bit closer to the bus
        duration: 2000,
        essential: true,
      });
    } catch (error) {
      console.log("Animation was interrupted.");
    }
  }, [isMapLoaded, busLocation]);

  // Effect to run the relocation animation only on initial load
  useEffect(() => {
    if (isMapLoaded) {
      handleRelocate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapLoaded]);

  // Effect for updating bus and stop markers
  useEffect(() => {
    if (!isMapLoaded || !map.current) return;

    // Clear and re-add stop markers
    document.querySelectorAll('.map-marker.stop-marker').forEach(el => el.remove());
    route.stops.forEach(stop => {
      const el = document.createElement('div');
      el.className = 'map-marker stop-marker';
      new Marker({ element: el })
        .setLngLat([stop.coordinates.lng, stop.coordinates.lat])
        .addTo(map.current!);
    });

    // Update bus marker
    const busCoords: [number, number] = [busLocation.coordinates.lng, busLocation.coordinates.lat];
    if (busMarkerRef.current) {
      busMarkerRef.current.setLngLat(busCoords);
    } else {
      const el = document.createElement('div');
      el.className = 'map-marker bus-marker';
      busMarkerRef.current = new Marker({ element: el })
        .setLngLat(busCoords)
        .addTo(map.current!);
    }
  }, [isMapLoaded, route, busLocation, selectedStopId]);

  return { mapContainer, userLocation, isMapLoaded, handleRelocate, handleLocateBus }; // Export the new function
};
