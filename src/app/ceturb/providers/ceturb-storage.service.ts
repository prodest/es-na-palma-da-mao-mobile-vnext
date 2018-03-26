import { Injectable } from '@angular/core';
import { LocalStorage } from '@espm/core';
import { Storage } from '@ionic/storage';

import { CeturbStorageModel } from './ceturb-storage.model';

/**
 *
 *
 */
@Injectable()
export class CeturbStorage extends LocalStorage<CeturbStorageModel> {
  /**
   *
   *
   */
  constructor(storage: Storage, defaults: any, storageKey: string) {
    super(storage, defaults, storageKey);
  }
}
