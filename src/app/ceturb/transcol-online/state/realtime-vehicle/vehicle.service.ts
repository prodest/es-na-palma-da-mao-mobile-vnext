import { VehiclesStore } from './vehicle.store';
import { Vehicle, createVehicle } from './vehicle.model';
import { Injectable } from '@angular/core';
import { TranscolOnlineRealTimeService } from '../../providers';

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
    .subscribe({
      next: (vehicles: Array<Vehicle>) => {
        // marca todos os veículos como "não atualizado"
        this.store.updateAll({
          atualizado: false
        });

        // insere ou atualiza os veículos na store
        vehicles.map(
          (vehicle) => {
            let newVehicle: Vehicle = createVehicle(vehicle);
            this.store.upsert(newVehicle.rotulo, (vehicle: Vehicle): Vehicle => ({
              ...newVehicle,
              passou: vehicle.distancia &&
                      vehicle.distancia < 50 && 
                      vehicle.distancia < newVehicle.distancia && 
                      !vehicle.passou
                      ? true : vehicle.passou
            } as Vehicle));
          }
        );

        // remove todos os veículos que não foram atualizados
        this.store.remove(vehicle => !vehicle.atualizado);
        console.log("VehiclesStore loaded!");
      },
      error: (error) => {
        console.error("ERROR", error);
      },
      complete: () => {
        this.store.setLoading(false);
      }
    });
  }
}
