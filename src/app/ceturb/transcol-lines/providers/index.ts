import { Storage } from '@ionic/storage';

import { BusLinesService } from './bus-lines.service';
import { CeturbApiService } from './ceturb-api.service';
import { CeturbStorage } from './ceturb-storage.service';

export function provideSettings(storage: Storage) {
  return new CeturbStorage(
    storage,
    {
      favoriteLines: []
    },
    '_ceturb-storage'
  );
}

// envronment provider
export const CeturbStorageProvider = { provide: CeturbStorage, useFactory: provideSettings, deps: [Storage] };

export { CeturbStorage, CeturbApiService, BusLinesService };

export const CeturbProviders = [
  CeturbStorageProvider,
  CeturbApiService,
  BusLinesService
];
