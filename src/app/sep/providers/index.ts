import { Storage } from '@ionic/storage';
import { SepApiService } from './sep-api.service';
import { SepStorage } from './sep-storage.service';
import { SepService } from './sep.service';

export function provideSettings(storage: Storage) {
  return new SepStorage(
    storage,
    {
      favoriteProtocols: [],
      date: null
    },
    '_sep-storage'
  );
}

// envronment provider
export const SepStorageProvider = { provide: SepStorage, useFactory: provideSettings, deps: [Storage] };

export { SepApiService, SepStorage, SepService };

export const SepProviders = [SepApiService, SepStorageProvider, SepService];
