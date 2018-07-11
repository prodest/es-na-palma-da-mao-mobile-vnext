import { Injectable } from '@angular/core';
import { LocalStorage } from '@espm/core';
import { Storage } from '@ionic/storage';

import { Vehicle } from './../model/vehicle';
import { DetranStorageModel } from './detran-storage.model';

/**
 * Serviço que trata local storage no contexto da autenticação
 *
 */
@Injectable()
export class DetranStorage extends LocalStorage<DetranStorageModel> {
  /**
   * C
   *
   */
  constructor(storage: Storage, defaults: any, storageKey: string) {
    super(storage, defaults, storageKey);
  }

  /**
   *
   *
   */
  containsVehicle = (vehicle: Vehicle): boolean => {
    return !!this.getValue('vehicles').find(v => {
      return v.plate.toUpperCase() === vehicle.plate.toUpperCase() || v.renavam === vehicle.renavam;
    });
  };
}
