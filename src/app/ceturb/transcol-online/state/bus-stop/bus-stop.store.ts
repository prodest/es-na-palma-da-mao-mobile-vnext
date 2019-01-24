import { BusStop } from './bus-stop.model';
import { EntityStore, EntityState, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface BusStopsState extends EntityState<BusStop> {

}

@Injectable()
@StoreConfig({name: 'BusStops', idKey: 'id'})
export class BusStopsStore extends EntityStore<BusStopsState, BusStop> {
  constructor() {
    super();
  }
}
