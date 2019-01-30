import { QueryEntity, QueryConfigOptions, QueryConfig, Order } from '@datorama/akita';
import { VehiclesState, VehiclesStore } from './vehicle.store';
import { Vehicle } from './vehicle.model';
import { Injectable } from '@angular/core';

@QueryConfig({
  sortBy: 'distancia',
  sortByOrder: Order.ASC
} as QueryConfigOptions)
@Injectable()
export class VehiclesQuery extends QueryEntity<VehiclesState, Vehicle> {
  constructor(protected store: VehiclesStore) {
    super(store);
  }
}
