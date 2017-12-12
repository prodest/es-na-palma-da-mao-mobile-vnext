import { Storage } from '@ionic/storage'

import { Settings } from './settings'
import { SettingsModel } from './settings.model'

export function provideSettings( storage: Storage ) {
    const defaults: Partial<SettingsModel> = {
        option1: true,
        option2: 'option2',
        option3: 'option3'
    }
    return new Settings( storage, defaults, '_settings' )
}

// envronment provider
export const SettingsProvider = { provide: Settings, useFactory: provideSettings, deps: [ Storage ] }
