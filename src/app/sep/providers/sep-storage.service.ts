import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocalStorage } from '@espm/core';

import { SepStorageModel } from './sep-storage.model';
import { Protocol } from './../model';

@Injectable()
export class SepStorage extends LocalStorage<SepStorageModel> {
  /* 
   * Creates an instance of SepStorageService
   */
  constructor(storage: Storage) {
    super(storage, { favoriteProtocols: [], date: null }, '_sep-storage');
  }

  isFavorite(protocol: Protocol): boolean {
    if (!protocol) {
      return false;
    }
    return !!this.getValue('favoriteProtocols').find(p => p.number === protocol.number);
  }
}
