import { VehiclesStore } from './vehicle.store';
import { Vehicle } from './vehicle.model';
import { Injectable } from '@angular/core';
import { TranscolOnlineRealTimeService } from '../../providers';
import { BusStopsQuery } from '../../state/bus-stop/bus-stop.query';
import { Observable } from 'rxjs/Observable';
import { ID } from '@datorama/akita';

@Injectable()
export class VehiclesService {
  nearestStop$: Observable<ID>;

  constructor(
    private store: VehiclesStore,
    private apiRealtime: TranscolOnlineRealTimeService,
    private busStopQuery: BusStopsQuery
  ) {
    this.nearestStop$ = this.busStopQuery.selectActiveId();
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
