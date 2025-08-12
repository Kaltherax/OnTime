import { BusData, BusLocation, ETAData, Coordinates } from '../types/bus';
import busData from '../data/busData.json';

// TODO: Replace all mock coordinates with real backend API endpoints
// Example backend endpoints:
// - GET /api/bus/location -> real-time bus GPS coordinates from vehicle tracking
// - GET /api/bus/eta -> calculated arrival times based on traffic and route data
// - GET /api/bus/routes -> route definitions with actual GPS waypoints from campus
// - POST /api/bus/proximity-check -> server-side proximity calculations using geofencing
// - WebSocket /ws/bus-updates -> real-time bus position updates for live tracking

// Placeholder functions for future backend integration
export const fetchBusLocation = async (): Promise<BusLocation> => {
  // TODO: Replace with actual API call to get real-time bus GPS coordinates from vehicle tracker
  // Example: const response = await fetch('/api/bus/location');
  // return await response.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return busData.currentBusLocation;
};

export const fetchETA = async (stopId?: string): Promise<ETAData> => {
  // TODO: Replace with actual API call to get calculated ETAs based on real traffic data and GPS tracking
  // Example: const response = await fetch(`/api/bus/eta${stopId ? `?stopId=${stopId}` : ''}`);
  // return await response.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return busData.estimatedArrivalTimes;
};

export const checkProximityAlert = async (userStopId: string, busLocation: BusLocation): Promise<boolean> => {
  // TODO: Replace with actual backend logic using real GPS coordinates, geofencing, and route calculations
  // Example: const response = await fetch('/api/bus/proximity-check', {
  //   method: 'POST',
  //   body: JSON.stringify({ userStopId, busLocation })
  // });
  // return await response.json();
  
  const route = busData.busRoutes.find(r => r.id === busLocation.routeId);
  if (!route) return false;
  
  const userStopIndex = route.stops.findIndex(stop => stop.id === userStopId);
  const currentStopIndex = busLocation.currentStopIndex;
  
  // Alert when bus is 2 stops before user's stop
  const alertThreshold = 2;
  const stopsUntilUser = userStopIndex - currentStopIndex;
  
  return stopsUntilUser === alertThreshold;
};

export const getBusRoutes = async (): Promise<BusData> => {
  // TODO: Replace with actual API call to get route definitions with GPS waypoints from campus transportation
  // Example: const response = await fetch('/api/bus/routes');
  // return await response.json();
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return busData as BusData;
};

// TODO: Remove this simulation function when integrating with real backend WebSocket updates
// Replace with WebSocket connection: const ws = new WebSocket('ws://your-backend/bus-updates');
// Utility function to simulate bus movement for demo purposes
export const simulateBusMovement = (currentLocation: BusLocation, route: any): BusLocation => {
  const stops = route.stops;
  let newStopIndex = currentLocation.currentStopIndex;
  let newDirection = currentLocation.direction;
  
  if (currentLocation.direction === 'forward') {
    newStopIndex = (currentLocation.currentStopIndex + 1) % stops.length;
    if (newStopIndex === stops.length - 1) {
      newDirection = 'backward';
    }
  } else {
    newStopIndex = currentLocation.currentStopIndex - 1;
    if (newStopIndex < 0) {
      newStopIndex = 0;
      newDirection = 'forward';
    }
  }
  
  return {
    ...currentLocation,
    currentStopIndex: newStopIndex,
    direction: newDirection,
    coordinates: stops[newStopIndex].coordinates,
    lastUpdated: new Date().toISOString()
  };
};