// FILE: src/components/BusMap.tsx
// Updated to include a "Relocate" button.

import React from 'react';
import { Navigation, LocateFixed } from 'lucide-react'; // Added LocateFixed icon
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
  const { mapContainer, userLocation, isMapLoaded, handleRelocate } = useMapLibre({ // 👈 Get the new function
    route,
    busLocation,
    selectedStopId,
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
      
      <div className="relative">
        <div  
          ref={mapContainer}  
          className="w-full h-96 md:h-[500px] relative"
          style={{ minHeight: '400px' }}
        />
        
        {/* --- NEW --- Relocate Button */}
        <button
          onClick={handleRelocate}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 z-10"
          aria-label="Relocate to your position"
        >
          <LocateFixed className="w-5 h-5 text-gray-700" />
        </button>

        {!isMapLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            {/* Loading animation... */}
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        {/* Footer/Legend content... */}
      </div>

      <style>{`
        /* --- Stop Marker Style --- */
        .stop-marker {
          width: 12px;
          height: 12px;
          background-color: #10B981; /* Green */
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 5px rgba(0,0,0,0.5);
          cursor: pointer;
        }
        
        /* --- User Marker Style --- */
        .user-marker {
            width: 16px;
            height: 16px;
            background-color: #3b82f6; /* Blue */
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 0 7px rgba(0,0,0,0.6);
        }
      `}</style>
    </div>
  );
};

export default BusMap;
