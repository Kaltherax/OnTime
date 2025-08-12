import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BusMap from './components/BusMap';
import ETACard from './components/ETACard';
import StopSelector from './components/StopSelector';
import Footer from './components/Footer';
import { useNotification } from './hooks/useNotification';
import { 
  fetchBusLocation, 
  fetchETA, 
  checkProximityAlert, 
  getBusRoutes,
  simulateBusMovement
} from './services/busService';
import { BusData, BusLocation, ETAData, BusRoute } from './types/bus';

function App() {
  const [busData, setBusData] = useState<BusData | null>(null);
  const [busLocation, setBusLocation] = useState<BusLocation | null>(null);
  const [eta, setEta] = useState<ETAData>({});
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { requestPermission, showNotification } = useNotification();

  // Initialize data and request notification permission
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const [initialBusData, initialBusLocation, initialEta] = await Promise.all([
          getBusRoutes(),
          fetchBusLocation(),
          fetchETA(),
        ]);
        
        setBusData(initialBusData);
        setBusLocation(initialBusLocation);
        setEta(initialEta);
        
        // Request notification permission
        await requestPermission();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [requestPermission]);

  // Simulate real-time bus movement and proximity alerts
  useEffect(() => {
    if (!busData || !busLocation || !selectedStopId) return;

    // Simulate proximity alert for demo - trigger after 3 seconds of selecting a stop
    const alertTimeout = setTimeout(() => {
      const route = busData.busRoutes[0];
      const selectedStop = route.stops.find(stop => stop.id === selectedStopId);
      if (selectedStop) {
        showNotification(
          'Bus Approaching!',
          {
            body: `Your bus will arrive at ${selectedStop.name} in approximately 2 stops. Get ready!`,
            icon: '/bus-icon.svg',
            tag: 'bus-alert',
            requireInteraction: true,
          }
        );
      }
    }, 3000);

    return () => clearTimeout(alertTimeout);
  }, [selectedStopId, busData, busLocation, showNotification]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bus tracker...</p>
        </div>
      </div>
    );
  }

  if (!busData || !busLocation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load bus data. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  const currentRoute = busData.busRoutes[0]; // Using first route for demo
  const selectedStop = currentRoute.stops.find(stop => stop.id === selectedStopId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <BusMap
              route={currentRoute}
              busLocation={busLocation}
              selectedStopId={selectedStopId}
              className="w-full"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <StopSelector
              stops={currentRoute.stops}
              selectedStopId={selectedStopId}
              onStopSelect={setSelectedStopId}
            />
            
            <ETACard
              eta={eta}
              selectedStopId={selectedStopId}
              selectedStopName={selectedStop?.name || null}
            />
          </div>
        </div>

        {/* Mobile-friendly bottom section */}
        <div className="mt-8 lg:hidden">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Current Route:</span>
                <p className="font-medium">{currentRoute.name}</p>
              </div>
              <div>
                <span className="text-gray-600">Total Stops:</span>
                <p className="font-medium">{currentRoute.stops.length}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;