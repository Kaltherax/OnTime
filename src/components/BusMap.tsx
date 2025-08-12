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

      {/* Custom CSS for 3D markers */}
      <style jsx>{`
        .bus-marker {
          cursor: pointer;
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

        .bus-door {
          position: absolute;
          bottom: 2px;
          left: 3px;
          width: 6px;
          height: 10px;
          background: #1a1a1a;
          border-radius: 1px;
        }

        .bus-number {
          position: absolute;
          top: 10px;
          right: 3px;
          width: 12px;
          height: 6px;
          background: white;
          border-radius: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 6px;
          font-weight: bold;
          color: #1d4ed8;
        }

        .bus-wheels {
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
        }

        .wheel {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #1a1a1a;
          border-radius: 50%;
          border: 1px solid #404040;
        }

        .wheel-front {
          left: 6px;
        }

        .wheel-back {
          right: 6px;
        }

        .stop-marker {
          cursor: pointer;
          transform: scale(0.8);
          transition: transform 0.2s ease;
        }

        .stop-marker:hover {
          transform: scale(0.9);
        }

        .stop-marker.selected {
          transform: scale(1.0);
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

        .stop-marker.current .stop-sign {
          background: #10b981;
          border-color: #059669;
          color: white;
        }

        .user-marker {
          cursor: pointer;
        }

        .user-location {
          position: relative;
          width: 20px;
          height: 20px;
        }

        .user-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: #8b5cf6;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .user-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: rgba(139, 92, 246, 0.3);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BusMap;