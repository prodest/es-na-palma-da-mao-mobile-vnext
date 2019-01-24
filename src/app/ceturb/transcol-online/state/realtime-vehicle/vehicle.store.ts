import { Vehicle } from './vehicle.model';
import { EntityStore, EntityState, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface VehiclesState extends EntityState<Vehicle> {

}

@Injectable()
@StoreConfig({name: 'Vehicles', idKey: 'rotulo'})
export class VehiclesStore extends EntityStore<VehiclesState, Vehicle> {
  constructor() {
    super();
  }
}
