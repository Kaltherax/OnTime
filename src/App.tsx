import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BusMap from './components/BusMap';
import ETACard from './components/ETACard';
import StopSelector from './components/StopSelector';
import SplashScreen from './components/SplashScreen';
import ParallaxAnimation from './components/ParallaxAnimation';
import { useNotification } from './hooks/useNotification';
import { 
  fetchBusLocation, 
  fetchETA, 
  getBusRoutes,
} from './services/busService';
import { BusData, BusLocation, ETAData } from './types/bus';

function App() {
  const [busData, setBusData] = useState<BusData | null>(null);
  const [busLocation, setBusLocation] = useState<BusLocation | null>(null);
  const [eta, setEta] = useState<ETAData>({});
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { requestPermission } = useNotification();

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
        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
      }
    };

    initializeApp();
  }, [requestPermission]);

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!busData || !busLocation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">Failed to load bus data. Please refresh the page.</p>
      </div>
    );
  }

  const currentRoute = busData.busRoutes[0];
  const selectedStop = currentRoute.stops.find(stop => stop.id === selectedStopId);

  return (
    // --- THIS IS THE FIX ---
    // This layout ensures both sections are visible
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* This makes the main content area scrollable if it's too tall */}
      <main className="flex-grow overflow-y-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
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

      {/* The animation is now guaranteed to be visible at the bottom */}
      <ParallaxAnimation /> 
    </div>
  );
}

export default App;
