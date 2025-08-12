// FILE: src/components/BusMap.tsx
// Updated to include the new CSS for the 3D bus marker.

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
  const { mapContainer, userLocation, isMapLoaded } = useMapLibre({
    route,
    busLocation,
    selectedStopId,
  });

  const currentStop = route.stops[busLocation.currentStopIndex];

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
        /* --- NEW CSS FOR 3D BUS --- */
        .bus-3d-container {
          width: 50px;
          height: 50px;
          perspective: 1000px; /* This creates the 3D space */
        }

        .bus-3d {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(-30deg); /* Adjust angle of the bus */
          animation: bus-hover 2s infinite ease-in-out;
        }

        .bus-face {
          position: absolute;
          border: 1px solid #014a78;
          background-color: rgba(2, 119, 189, 0.8); /* Semi-transparent blue */
        }

        /* Dimensions of the bus */
        .bus-front, .bus-back { width: 50px; height: 30px; }
        .bus-right, .bus-left { width: 25px; height: 30px; }
        .bus-top, .bus-bottom { width: 50px; height: 25px; }

        /* Positioning each face to form a cuboid */
        .bus-front  { transform: rotateY(0deg) translateZ(12.5px); }
        .bus-back   { transform: rotateY(180deg) translateZ(12.5px); }
        .bus-right  { transform: rotateY(90deg) translateZ(25px); }
        .bus-left   { transform: rotateY(-90deg) translateZ(25px); }
        .bus-top    { transform: rotateX(90deg) translateZ(15px); background-color: #01579b; }
        .bus-bottom { transform: rotateX(-90deg) translateZ(15px); }

        @keyframes bus-hover {
          0%, 100% { transform: rotateX(-20deg) rotateY(-30deg) translateY(0); }
          50% { transform: rotateX(-20deg) rotateY(-30deg) translateY(-5px); }
        }

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
      `}</style>
    </div>
  );
};

export default BusMap;
