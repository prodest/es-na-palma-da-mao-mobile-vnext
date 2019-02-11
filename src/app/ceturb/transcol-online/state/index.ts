import { BusStopsStore, BusStopsQuery, BusStopsService, BusStop } from './bus-stop';
import { VehiclesStore, VehiclesQuery, VehiclesService, Vehicle } from './realtime-vehicle';

export { BusStopsStore, BusStopsQuery, BusStopsService, BusStop };
export { VehiclesStore, VehiclesQuery, VehiclesService, Vehicle };

export const TranscolOnlineStores = [ 
  BusStopsStore, BusStopsQuery, BusStopsService,
  VehiclesStore, VehiclesQuery, VehiclesService
];
