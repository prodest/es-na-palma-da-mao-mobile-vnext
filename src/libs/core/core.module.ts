import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { Auth } from './auth';
import { Common } from './common';
import { EnvironmentProvider } from './environment';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { androidPermissionsProvider } from './permissions';

// import { Api } from './api'
// import { Config } from './app.config'
// import { GoogleMaps } from './google-maps'
// import { Push } from './push'
// import { AppState } from './state'
// import { Storage } from './storage'

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AndroidPermissions,
    EnvironmentProvider,
    //    Config,
    ...Auth,
    ...Common,
    ...androidPermissionsProvider
    // ...Storage,
    //  ...Api,
    //  ...AppState,
    //  ...Push,
    //  ...GoogleMaps
  ]
})
export class CoreModule {
  /**
   * Creates an instance of CoreModule.
   */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
