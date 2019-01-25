import { VehiclesStore } from './vehicle.store';
import { Vehicle } from './vehicle.model';
import { Injectable } from '@angular/core';
import { TranscolOnlineRealTimeService } from '../../providers';
import { BusStopsQuery } from '../';
import { Observable } from 'rxjs/Observable';
import { ID } from '@datorama/akita';

@Injectable()
export class VehiclesService {
  nearestStop$: Observable<ID>;

  constructor(
    protected store: VehiclesStore,
    private apiRealtime: TranscolOnlineRealTimeService,
    private busStopsQuery: BusStopsQuery
  ) {
    this.nearestStop$ = this.busStopsQuery.selectActiveId();
    this.updateVehicles();
  }

  updateVehicles() {
    this.nearestStop$.subscribe(
      (id: number) => {
        this.apiRealtime.getNextVehicles(id).subscribe((vehicles: Array<Vehicle>) => {
          this.store.set(vehicles);
        });
      }
    );
  }
}
