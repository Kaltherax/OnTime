// FILE: src/hooks/useMapLibre.ts
// Final version with SVG import and all features implemented.

import { useRef, useEffect, useState, useCallback } from 'react';
import maplibregl, { Map, Marker } from 'maplibre-gl';
import { BusRoute, BusLocation, Coordinates } from '../types/bus';
import busIconUrl from '/bus-icon.svg'; 
import userIconUrl from '/user.svg'; // 👈 1. Import the user SVG

interface UseMapLibreProps {
  route: BusRoute;
  busLocation: BusLocation;
  selectedStopId: string | null;
}

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

export const useMapLibre = ({ route, busLocation: initialBusLocation, selectedStopId }: UseMapLibreProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const busMarkerRef = useRef<Marker | null>(null);
  const userMarkerRef = useRef<Marker | null>(null);
  const isAnimatingRef = useRef(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [busLocation, setBusLocation] = useState<BusLocation>(initialBusLocation);

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
      zoom: 14, pitch: 60, bearing: -17.6,
    });
    map.current.on('load', () => setIsMapLoaded(true));
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [route]);

  // --- Effect for INITIAL animation ONLY ---
  useEffect(() => {
    if (!isMapLoaded) return;

    const runInitialAnimation = () => {
        if (!map.current || !navigator.geolocation || isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const userCoords = { lat: latitude, lng: longitude };
                setUserLocation(userCoords);

                // --- UPDATED ---
                const el = document.createElement('img');
                el.src = userIconUrl;
                el.className = 'user-svg-marker'; // Use a new class for styling
                userMarkerRef.current = new Marker({ element: el, anchor: 'bottom' }).setLngLat([userCoords.lng, userCoords.lat]).addTo(map.current!);

                const offsetLatitude = latitude + 0.027;
                setBusLocation(prev => ({ ...prev, coordinates: { lat: offsetLatitude, lng: longitude } }));

                try {
                    await map.current?.flyTo({ zoom: 5, duration: 4000 });
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    await map.current?.flyTo({ center: [userCoords.lng, userCoords.lat], zoom: 17, duration: 5000, essential: true });
                } catch (e) { console.log("Initial animation interrupted."); }
                finally { isAnimatingRef.current = false; }
            },
            (error) => {
                console.error("Error on initial location:", error.message);
                isAnimatingRef.current = false;
            }
        );
    };
    
    runInitialAnimation();

  }, [isMapLoaded]);


  // --- UPDATED: Handler for the RELOCATE BUTTON ONLY ---
  const handleRelocate = useCallback(() => {
    if (!isMapLoaded || !map.current || !navigator.geolocation || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userCoords = { lat: latitude, lng: longitude };
        setUserLocation(userCoords);

        if (userMarkerRef.current) {
          userMarkerRef.current.setLngLat([userCoords.lng, userCoords.lat]);
        } else {
          // --- UPDATED ---
          const el = document.createElement('img');
          el.src = userIconUrl;
          el.className = 'user-svg-marker';
          userMarkerRef.current = new Marker({ element: el, anchor: 'bottom' }).setLngLat([userCoords.lng, userCoords.lat]).addTo(map.current!);
        }
        
        try {
          await map.current?.flyTo({ zoom: 5, duration: 4000 });
          await new Promise(resolve => setTimeout(resolve, 1500));
          await map.current?.flyTo({ center: [userCoords.lng, userCoords.lat], zoom: 17, duration: 5000, essential: true });
        } catch (error) { console.log("Relocate animation interrupted."); }
        finally { isAnimatingRef.current = false; }
      },
      (error) => {
        console.error("Error getting user location:", error.message);
        isAnimatingRef.current = false;
      }
    );
  }, [isMapLoaded]);

  // Handler for the "Locate Bus" button
  const handleLocateBus = useCallback(async () => {
    if (!isMapLoaded || !map.current || !busLocation || isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    const busCoords: [number, number] = [busLocation.coordinates.lng, busLocation.coordinates.lat];
    
    try {
      await map.current?.flyTo({ zoom: 12, duration: 2500 });
      await map.current?.flyTo({ center: busCoords, duration: 3500 });
      await map.current?.flyTo({ center: busCoords, zoom: 17, duration: 2500 });
    } catch (error) { console.log("Locate bus animation interrupted."); }
    finally { isAnimatingRef.current = false; }
  }, [isMapLoaded, busLocation]);

  // Effect for updating all markers
  useEffect(() => {
    if (!isMapLoaded || !map.current) return;

    document.querySelectorAll('.map-marker.stop-marker').forEach(el => el.remove());
    route.stops.forEach(stop => {
      const el = document.createElement('div');
      el.className = 'map-marker stop-marker';
      new Marker({ element: el }).setLngLat([stop.coordinates.lng, stop.coordinates.lat]).addTo(map.current!);
    });

    const busCoords: [number, number] = [busLocation.coordinates.lng, busLocation.coordinates.lat];
    if (busMarkerRef.current) {
      busMarkerRef.current.setLngLat(busCoords);
    } else {
      const el = document.createElement('img');
      el.src = busIconUrl; // Use the imported SVG
      el.className = 'bus-svg-marker';
      busMarkerRef.current = new Marker({ element: el, anchor: 'bottom' })
        .setLngLat(busCoords)
        .addTo(map.current!);
    }
  }, [isMapLoaded, route, busLocation, selectedStopId]);

  return { mapContainer, userLocation, isMapLoaded, handleRelocate, handleLocateBus };
};
