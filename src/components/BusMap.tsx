// FILE: src/hooks/useMapLibre.ts
// This is the main file to update.

import { useRef, useEffect, useState } from 'react';
import maplibregl, { Map, Marker } from 'maplibre-gl';
import { BusRoute, BusLocation, Coordinates } from '../types/bus';

interface UseMapLibreProps {
  route: BusRoute;
  busLocation: BusLocation;
  selectedStopId: string | null;
}

// --- IMPORTANT ---
// PASTE YOUR MAPTILER API KEY HERE
const MAPTILER_API_KEY = 'YOUR_API_KEY_HERE'; 
// --- IMPORTANT ---


export const useMapLibre = ({ route, busLocation, selectedStopId }: UseMapLibreProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Initialize map only once

    if (!MAPTILER_API_KEY || MAPTILER_API_KEY === 'YOUR_API_KEY_HERE') {
      console.error("MapTiler API key is missing. Please add it to useMapLibre.ts");
      return;
    }

    const initialCoords = route.stops[0].coordinates;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`,
      center: [initialCoords.lng, initialCoords.lat],
      zoom: 14,
      pitch: 45, // 3D view
      bearing: -17.6,
    });

    map.current.on('load', () => {
      setIsMapLoaded(true);
      // Add other map sources and layers here if needed
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [route]); // Dependency on route to initialize map

  // Effect to update markers when data changes
  useEffect(() => {
    if (!isMapLoaded || !map.current) return;

    // Clear existing markers (a simple approach)
    // A more optimized approach would be to update existing markers
    document.querySelectorAll('.map-marker').forEach(el => el.remove());

    // Add bus stops markers
    route.stops.forEach(stop => {
      const el = document.createElement('div');
      el.className = 'map-marker stop-marker';
      if (stop.id === selectedStopId) {
        el.classList.add('selected');
      }
      el.innerHTML = `<div class="stop-icon"><div class="stop-sign">${stop.name}</div><div class="stop-pole"></div></div>`;
      
      new maplibregl.Marker(el)
        .setLngLat([stop.coordinates.lng, stop.coordinates.lat])
        .addTo(map.current!);
    });

    // Add bus marker
    const busEl = document.createElement('div');
    busEl.className = 'map-marker bus-marker';
    busEl.innerHTML = `<div class="bus-3d"><div class="bus-body"><div class="bus-windows"></div></div><div class="bus-wheels"><div class="wheel wheel-front"></div><div class="wheel wheel-back"></div></div></div>`;

    new maplibregl.Marker(busEl)
      .setLngLat([busLocation.coordinates.lng, busLocation.coordinates.lat])
      .addTo(map.current!);

  }, [isMapLoaded, route, busLocation, selectedStopId]);


  return { mapContainer, userLocation, isMapLoaded };
};


// ====================================================================================


// FILE: src/components/BusMap.tsx
// This file has a very minor change to pass the API key.

import React from 'react';
import { Navigation } from 'lucide-react';
import { BusRoute, BusLocation } from '../types/bus';
import { useMapLibre } from '../hooks/useMapLibre';
import 'maplibre-gl/dist/maplibre-gl.css';

interface BusMapProps {
  route: BusRoute;
  busLocation: BusLocation;
  selectedStopId: string | null;
  className?: string;
}

const BusMap: React.FC<BusMapProps> = ({
  route,
  busLocation,
  selectedStopId,
  className = '',
}) => {
  // The hook now handles everything, including the API key internally
  const { mapContainer, userLocation, isMapLoaded } = useMapLibre({
    route,
    busLocation,
    selectedStopId
  });

  const currentStop = route.stops[busLocation.currentStopIndex];

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-blue-50 to-green-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-medium text-gray-900">3D Campus Bus Map</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600">Live</span>
            </div>
          </div>
          {userLocation && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-blue-600">Your Location</span>
            </div>
          )}
        </div>
      </div>
      
      {/* 3D MapLibre Container */}
      <div className="relative">
        <div  
          ref={mapContainer}  
          className="w-full h-96 md:h-[500px] relative"
          style={{ minHeight: '400px' }}
        />
        
        {!isMapLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading 3D map...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Current Bus</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Bus Stops</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Selected Stop</span>
            </div>
            {userLocation && (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>You</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div>Current: {currentStop?.name}</div>
            <div className="text-xs text-gray-500">
              Updated: {new Date(busLocation.lastUpdated).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for 3D markers - This is not standard React practice */}
      {/* For a real app, this should be in a CSS file or a styled-components system */}
      <style>{`
        .map-marker {
          cursor: pointer;
        }
        .bus-marker {
          z-index: 10;
        }
        .bus-3d {
          position: relative;
          transform: scale(1.2);
        }
        .bus-body {
          width: 40px;
          height: 20px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 4px;
          position: relative;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          border: 1px solid #1e40af;
        }
        .bus-windows {
          position: absolute;
          top: 2px;
          left: 3px;
          right: 3px;
          height: 8px;
          background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
          border-radius: 2px;
          border: 1px solid #0277bd;
        }
        .stop-marker {
          transform: scale(0.8);
          transition: transform 0.2s ease;
        }
        .stop-marker:hover {
          transform: scale(0.9);
        }
        .stop-marker.selected {
          transform: scale(1.0);
          z-index: 5;
        }
        .stop-icon {
          position: relative;
        }
        .stop-pole {
          width: 3px;
          height: 25px;
          background: #6b7280;
          margin: 0 auto;
          border-radius: 2px;
        }
        .stop-sign {
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border: 2px solid #3b82f6;
          border-radius: 4px;
          padding: 2px 6px;
          white-space: nowrap;
          font-size: 10px;
          font-weight: bold;
          color: #1d4ed8;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .stop-marker.selected .stop-sign {
          background: #ef4444;
          border-color: #dc2626;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default BusMap;
