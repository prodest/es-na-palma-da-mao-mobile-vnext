import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'

import { LocalStorage } from './../storage/local-storage.service'
import { AuthStorageModel } from './auth-storage.model'

/**
 * Serviço que trata local storage no contexto da autenticação
 *
 */
@Injectable()
export class AuthStorage extends LocalStorage<AuthStorageModel> {
  /**
   * Creates an instance of AuthStorage.
   *
   */
  constructor(storage: Storage, defaults: any, storageKey: string) {
    super(storage, defaults, storageKey)
  }
}
