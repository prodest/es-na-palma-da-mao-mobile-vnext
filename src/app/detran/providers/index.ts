import { Storage } from '@ionic/storage'

import { DetranApiService } from './detran-api.service'
import { DetranStorage } from './detran-storage.service'
import { DetranService } from './detran.service'

export function provideSettings( storage: Storage ) {
    return new DetranStorage( storage, {}, '_detran-storage' )
}

// envronment provider
export const DetranStorageProvider = { provide: DetranStorage, useFactory: provideSettings, deps: [ Storage ] }

export { DetranStorage, DetranApiService, DetranService }

export const DetranProviders = [ DetranStorageProvider, DetranApiService, DetranService ]
