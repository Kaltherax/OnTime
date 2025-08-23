// FILE: src/components/BusMap.tsx
// This component displays the map and the control buttons.

import React from 'react';
import { Navigation, LocateFixed, Bus } from 'lucide-react';
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
  const { mapContainer, userLocation, isMapLoaded, handleRelocate, handleLocateBus } = useMapLibre({
    route,
    busLocation,
    selectedStopId,
  });

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-blue-50 to-green-50 px-4 py-3 border-b border-gray-200">
        {/* Header content... */}
      </div>
      
      <div className="relative">
        <div  
          ref={mapContainer}  
          className="w-full h-96 md:h-[500px] relative"
          style={{ minHeight: '400px' }}
        />
        
        {/* Map Control Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
          <button
            onClick={handleRelocate}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Relocate to your position"
          >
            <LocateFixed className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={handleLocateBus}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Locate the bus"
          >
            <Bus className="w-5 h-5 text-gray-700" />
          </button>
        </div>

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
        
        /* --- SVG User Marker Style --- */
        .user-svg-marker {
            width: 40px;
            height: 40px;
            cursor: pointer;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        
        /* --- SVG Bus Marker Style --- */
        .bus-svg-marker {
            width: 48px;
            height: 48px;
            cursor: pointer;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
            transition: transform 0.2s ease-in-out;
        }
        .bus-svg-marker:hover {
            transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default BusMap;
