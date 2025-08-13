import React from 'react';
import { MapPin } from 'lucide-react';
import { BusStop } from '../types/bus';

interface StopSelectorProps {
  stops: BusStop[];
  selectedStopId: string | null;
  onStopSelect: (stopId: string) => void;
}

const StopSelector: React.FC<StopSelectorProps> = ({
  stops,
  selectedStopId,
  onStopSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-3">
        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Set Your Stop</h3>
      </div>
      <div className="relative">
        <select
          value={selectedStopId || ''}
          onChange={(e) => onStopSelect(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none"
        >
          <option value="" disabled>
            Select your bus stop...
          </option>
          {stops.map((stop) => (
            <option key={stop.id} value={stop.id}>
              {stop.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.516 7.548c.436-.446 1.043-.481 1.576 0L10 10.405l2.908-2.857c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615l-3.712 3.648a1.103 1.103 0 01-1.56 0L5.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StopSelector;
