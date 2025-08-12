import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { BusStop } from '../types/bus';

interface StopSelectorProps {
  stops: BusStop[];
  selectedStopId: string | null;
  onStopSelect: (stopId: string) => void;
  className?: string;
}

const StopSelector: React.FC<StopSelectorProps> = ({
  stops,
  selectedStopId,
  onStopSelect,
  className = '',
}) => {
  const selectedStop = stops.find(stop => stop.id === selectedStopId);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
          <MapPin className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Set Your Stop</h3>
      </div>
      
      <div className="relative">
        <select
          value={selectedStopId || ''}
          onChange={(e) => onStopSelect(e.target.value)}
          className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="">Select your bus stop...</option>
          {stops.map((stop) => (
            <option key={stop.id} value={stop.id}>
              {stop.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      
      {selectedStop && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Selected stop:</span> {selectedStop.name}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            You'll be notified when the bus is 2 stops away!
          </p>
        </div>
      )}
    </div>
  );
};

export default StopSelector;