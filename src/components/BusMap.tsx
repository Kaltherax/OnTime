// FILE: src/components/BusMap.tsx
// Rolled back to a clean version with no custom marker styles.

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
      
      {/* All custom marker CSS has been removed. */}
    </div>
  );
};

export default BusMap;
