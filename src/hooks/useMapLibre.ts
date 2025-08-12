// FILE: src/hooks/useMapLibre.ts
// Updated to create the HTML structure for a 3D CSS bus.

import { useRef, useEffect, useState } from 'react';
import maplibregl, { Map, Marker } from 'maplibre-gl';
import { BusRoute, BusLocation, Coordinates } from '../types/bus';

interface UseMapLibreProps {
  route: BusRoute;
  busLocation: BusLocation;
  selectedStopId: string | null;
}

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

export const useMapLibre = ({ route, busLocation, selectedStopId }: UseMapLibreProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const busMarkerRef = useRef<Marker | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  // Effect for initializing the map instance
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    if (!MAPTILER_API_KEY) {
      console.error("MapTiler API key is missing.");
      return;
    }

    const initialCoords = route.stops[0].coordinates;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`,
      center: [initialCoords.lng, initialCoords.lat],
      zoom: 14,
      pitch: 50, // Increased pitch for a better 3D view
      bearing: -20,
    });

    map.current.on('load', () => setIsMapLoaded(true));

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [route]);

  // Effect for updating markers on the map
  useEffect(() => {
    if (!isMapLoaded || !map.current) return;

    // Remove old stop markers before adding new ones
    document.querySelectorAll('.stop-marker').forEach(el => el.remove());

    // Add bus stop markers
    route.stops.forEach(stop => {
      const el = document.createElement('div');
      el.className = 'stop-marker';
      // You can add more complex HTML for stop markers here if you wish
      new Marker(el)
        .setLngLat([stop.coordinates.lng, stop.coordinates.lat])
        .addTo(map.current!);
    });

    // Update or create the 3D bus marker
    const busCoords: [number, number] = [busLocation.coordinates.lng, busLocation.coordinates.lat];
    if (busMarkerRef.current) {
      busMarkerRef.current.setLngLat(busCoords);
    } else {
      const el = document.createElement('div');
      el.className = 'bus-3d-container';
      // This HTML structure creates the 3D bus
      el.innerHTML = `
        <div class="bus-3d">
          <div class="bus-face bus-front"></div>
          <div class="bus-face bus-back"></div>
          <div class="bus-face bus-right"></div>
          <div class="bus-face bus-left"></div>
          <div class="bus-face bus-top"></div>
          <div class="bus-face bus-bottom"></div>
        </div>
      `;
      busMarkerRef.current = new Marker({ element: el, anchor: 'bottom' })
        .setLngLat(busCoords)
        .addTo(map.current!);
    }
  }, [isMapLoaded, route, busLocation, selectedStopId]);

  return { mapContainer, userLocation, isMapLoaded };
};
