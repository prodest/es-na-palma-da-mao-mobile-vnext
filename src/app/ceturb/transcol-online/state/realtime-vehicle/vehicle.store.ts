import { Vehicle } from './vehicle.model';
import { EntityStore, EntityState, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface VehiclesState extends EntityState<Vehicle> {

}

@Injectable()
@StoreConfig({name: 'Vehicles', idKey: 'rotulo'})
/**
 * Entidade que armazena os ônibus em tempo real.
 */
export class VehiclesStore extends EntityStore<VehiclesState, Vehicle> {
  constructor() {
    super();
    this.setLoading(false);
  }
}
