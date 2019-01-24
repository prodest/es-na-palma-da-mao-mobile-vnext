import { QueryEntity } from '@datorama/akita';
import { VehiclesState, VehiclesStore } from './vehicle.store';
import { Vehicle } from './vehicle.model';
import { Injectable } from '@angular/core';


@Injectable()
export class VehiclesQuery extends QueryEntity<VehiclesState, Vehicle> {
  constructor(protected store: VehiclesStore) {
    super(store);
  }
}
