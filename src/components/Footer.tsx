import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-gray-600">
          <p>On Time © 2025. Real-time bus tracking for your convenience.</p>
          <p className="mt-1 text-xs text-gray-500">
            Built for college campuses • Powered by Google Maps
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;