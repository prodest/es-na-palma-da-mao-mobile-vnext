import { BusStopsStore } from './bus-stop/bus-stop.store';
import { BusStopsQuery } from './bus-stop/bus-stop.query';
import { BusStopsService } from './bus-stop/bus-stop.service';
import { BusStop } from './bus-stop/bus-stop.model';

import { VehiclesStore } from './realtime-vehicle/vehicle.store';
import { VehiclesQuery } from './realtime-vehicle/vehicle.query';
import { VehiclesService } from './realtime-vehicle/vehicle.service';
import { Vehicle } from './realtime-vehicle/vehicle.model';

export { BusStopsStore, BusStopsQuery, BusStopsService, BusStop }
export { VehiclesStore, VehiclesQuery, VehiclesService, Vehicle }

export const TranscolOnlineStores = [ 
  BusStopsStore,
  BusStopsQuery,
  BusStopsService,
  VehiclesStore,
  VehiclesQuery,
  VehiclesService
];
