import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'

import { LocalStorage } from './../storage/local-storage.service'
import { SettingsModel } from './settings.model'

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Settings extends LocalStorage<SettingsModel> {
  /**
   *
   *
   */
  constructor(storage: Storage, defaults: any, storageKey: string) {
    super(storage, defaults, storageKey)
  }
}
