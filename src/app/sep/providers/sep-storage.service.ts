import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocalStorage } from '@espm/core';

import { SepStorageModel } from './sep-storage.model';

@Injectable()
export class SepStorageService extends LocalStorage<SepStorageModel> {
  constructor(storage: Storage, defaults: any, storageKey: string) {
    super(storage, defaults, storageKey);
  }
}
