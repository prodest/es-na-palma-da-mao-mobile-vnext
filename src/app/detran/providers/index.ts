import { Storage } from '@ionic/storage';

import { DetranApiService } from './detran-api.service';
import { DetranStorage } from './detran-storage.service';
import { DriverService } from './driver.service';
import { VehiclesService } from './vehicles.service';

export function provideSettings(storage: Storage) {
  return new DetranStorage(
    storage,
    {
      vehiclesData: { vehicles: [] }
    },
    '_detran-storage'
  );
}

// envronment provider
export const DetranStorageProvider = { provide: DetranStorage, useFactory: provideSettings, deps: [Storage] };

export { DetranStorage, DetranApiService, DriverService, VehiclesService };

export const DetranProviders = [DetranStorageProvider, DetranApiService, DriverService, VehiclesService];
