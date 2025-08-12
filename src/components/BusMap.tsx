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
          width: 60px;
          height: 60px;
          perspective: 1000px; /* This creates the 3D space */
        }

        .bus-3d {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(-45deg); /* Adjust angle of the bus */
          animation: bus-hover 2s infinite ease-in-out;
        }

        .bus-face {
          position: absolute;
          border: 1px solid #003d6e;
          background-color: #005a9e; /* Darker, solid blue */
        }
        
        .bus-face.bus-top {
           background-color: #004c8c;
        }
        
        .bus-face.bus-front::before {
            content: '';
            position: absolute;
            top: 5px;
            left: 5px;
            right: 5px;
            height: 12px;
            background: #b3e5fc; /* Windshield */
            border-radius: 2px;
        }

        /* Dimensions of the bus */
        .bus-front, .bus-back { width: 40px; height: 35px; }
        .bus-right, .bus-left { width: 60px; height: 35px; }
        .bus-top, .bus-bottom { width: 40px; height: 60px; }

        /* Positioning each face to form a cuboid */
        .bus-front  { transform: rotateY(0deg) translateZ(30px); }
        .bus-back   { transform: rotateY(180deg) translateZ(30px); }
        .bus-right  { transform: rotateY(90deg) translateZ(20px); }
        .bus-left   { transform: rotateY(-90deg) translateZ(20px); }
        .bus-top    { transform: rotateX(90deg) translateZ(17.5px); }
        .bus-bottom { transform: rotateX(-90deg) translateZ(17.5px); }

        @keyframes bus-hover {
          0%, 100% { transform: rotateX(-20deg) rotateY(-45deg) translateY(0); }
          50% { transform: rotateX(-20deg) rotateY(-45deg) translateY(-5px); }
        }

        /* --- NEW Stop Marker Style --- */
        .stop-marker {
          width: 30px;
          height: 30px;
          position: relative;
          cursor: pointer;
        }
        
        .stop-marker::before {
            content: '';
            position: absolute;
            width: 24px;
            height: 24px;
            background-color: #008080; /* Teal */
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            left: 3px;
            top: -3px;
            border: 2px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.4);
        }
        
        .stop-marker::after {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
            left: 11px;
            top: 5px;
            z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default BusMap;
