import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BusMap from './components/BusMap';
import ETACard from './components/ETACard';
import StopSelector from './components/StopSelector';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen'; // 👈 1. Import the new component
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
        
        await requestPermission();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        // This is a good place to hide the splash screen
        // For a smoother effect, let the animation play out
        setTimeout(() => {
            setIsLoading(false);
        }, 4000); // Match the animation duration
      }
    };

    initializeApp();
  }, [requestPermission]);

  // Simulate real-time bus movement and proximity alerts
  useEffect(() => {
    if (!busData || !busLocation || !selectedStopId) return;

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

  // 👇 2. Show SplashScreen while loading
  if (isLoading) {
    return <SplashScreen />;
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

  const currentRoute = busData.busRoutes[0];
  const selectedStop = currentRoute.stops.find(stop => stop.id === selectedStopId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BusMap
              route={currentRoute}
              busLocation={busLocation}
              selectedStopId={selectedStopId}
              className="w-full"
            />
          </div>

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
      </main>

      <Footer />
    </div>
  );
}

export default App;
