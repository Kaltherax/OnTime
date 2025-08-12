import React from 'react';
import { Clock, Bus, AlertCircle } from 'lucide-react';
import { ETAData } from '../types/bus';

interface ETACardProps {
  eta: ETAData;
  selectedStopId: string | null;
  selectedStopName: string | null;
  className?: string;
}

const ETACard: React.FC<ETACardProps> = ({
  eta,
  selectedStopId,
  selectedStopName,
  className = '',
}) => {
  const selectedETA = selectedStopId ? eta[selectedStopId] : null;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
          <Clock className="w-4 h-4 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Arrival Time</h3>
      </div>

      {selectedStopId && selectedETA ? (
        <div className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Bus className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Next Bus</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{selectedETA}</div>
            <div className="text-sm text-gray-600">{selectedStopName}</div>
          </div>
          
          <div className="flex items-start space-x-2 p-3 bg-orange-50 rounded-lg">
            <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-orange-800">
              This is an estimated time based on current traffic and route conditions.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Bus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-2">Select a bus stop to see arrival time</p>
          <p className="text-sm text-gray-400">
            Choose your destination from the dropdown above
          </p>
        </div>
      )}
    </div>
  );
};

export default ETACard;