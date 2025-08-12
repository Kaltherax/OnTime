import React from 'react';
import { Bus } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">On Time</h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Forget about guessing where your college bus is now
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;