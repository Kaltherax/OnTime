// FILE: src/hooks/useMapLibre.ts
// Updated to export a function that can trigger the relocation animation.

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

  // --- REFACTORED --- Logic for animation and getting location
  const handleRelocate = useCallback(async () => {
    if (!isMapLoaded || !map.current || !navigator.geolocation) {
      console.log("Map not loaded or geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userCoords: Coordinates = { lat: latitude, lng: longitude };
        
        setUserLocation(userCoords);

        // Add or update the user marker
        const userMarkerEl = document.querySelector('.user-marker') || document.createElement('div');
        userMarkerEl.className = 'user-marker';
        new Marker(userMarkerEl)
          .setLngLat([userCoords.lng, userCoords.lat])
          .addTo(map.current!);

        // --- Animation Sequence ---
        try {
          // 1. Zoom Out
          await map.current?.flyTo({ zoom: 5, duration: 2000 });
          // 2. Wait for 1 second
          await new Promise(resolve => setTimeout(resolve, 1000));
          // 3. Zoom In to the new location
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
  }, [isMapLoaded]); // useCallback dependency

  // Effect to run the relocation animation on initial load
  useEffect(() => {
    if (isMapLoaded) {
      handleRelocate();
    }
  }, [isMapLoaded, handleRelocate]);

  // Effect for updating bus and stop markers
  useEffect(() => {
    if (!isMapLoaded || !map.current) return;

    // Clear and re-add stop markers
    document.querySelectorAll('.map-marker.stop-marker').forEach(el => el.remove());
    route.stops.forEach(stop => {
      const el = document.createElement('div');
      el.className = 'map-marker stop-marker';
      new Marker(el)
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
      busMarkerRef.current = new Marker(el)
        .setLngLat(busCoords)
        .addTo(map.current!);
    }
  }, [isMapLoaded, route, busLocation, selectedStopId]);

  return { mapContainer, userLocation, isMapLoaded, handleRelocate }; // 👈 Export the function
};
