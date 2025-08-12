export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BusStop {
  id: string;
  name: string;
  coordinates: Coordinates;
  order: number;
}

export interface BusRoute {
  id: string;
  name: string;
  stops: BusStop[];
}

export interface BusLocation {
  routeId: string;
  coordinates: Coordinates;
  currentStopIndex: number;
  direction: 'forward' | 'backward';
  lastUpdated: string;
}

export interface ETAData {
  [stopId: string]: string;
}

export interface BusData {
  busRoutes: BusRoute[];
  currentBusLocation: BusLocation;
  estimatedArrivalTimes: ETAData;
}