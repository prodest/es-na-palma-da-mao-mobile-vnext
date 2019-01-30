import { VehiclesStore } from './vehicle.store';
import { Vehicle, createVehicle } from './vehicle.model';
import { Injectable } from '@angular/core';
import { TranscolOnlineRealTimeService } from '../../providers';
import { map } from 'rxjs/operators';

@Injectable()
export class VehiclesService {
  constructor(
    protected store: VehiclesStore,
    private apiRealtime: TranscolOnlineRealTimeService
  ) {

  }

  updateVehicles(stopId: number) {
    this.store.setLoading(true);
    this.apiRealtime.getNextVehicles(stopId)
    .pipe(
      map(
        (vehicles: Vehicle[]) => {
          vehicles.map(
            (vehicle) => {
              this.store.createOrReplace(vehicle.rotulo, createVehicle(vehicle))
            }
          );
          return vehicles;
        }
      )
    )
    .subscribe(
      (vehicles: Array<Vehicle>) => {
        console.log("VehiclesStore loaded!");
        this.store.setLoading(false);
      }
    );
  }
}
