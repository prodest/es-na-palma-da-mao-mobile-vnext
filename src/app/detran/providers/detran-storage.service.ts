import { Injectable } from '@angular/core'
import { LocalStorage } from '@espm/core'
import { Storage } from '@ionic/storage'

import { DetranStorageModel } from './detran-storage.model'

/**
 * Serviço que trata local storage no contexto da autenticação
 *
 */
@Injectable()
export class DetranStorage extends LocalStorage<DetranStorageModel> {
    /**
     * Creates an instance of DetranStorage.
     *
     */
    constructor ( storage: Storage, defaults: any, storageKey: string ) {
        super( storage, defaults, storageKey )
    }
}
