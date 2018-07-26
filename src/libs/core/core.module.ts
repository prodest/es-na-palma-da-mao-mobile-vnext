import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { Auth } from './auth';
import { Common } from './common';
import { EnvironmentProvider } from './environment';
import { androidPermissionsProvider } from './permissions';
import { PushProvider } from './push'

// import { Api } from './api'
// import { Config } from './app.config'
// import { GoogleMaps } from './google-maps'
// import { AppState } from './state'
// import { Storage } from './storage'

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    EnvironmentProvider,
    //    Config,
    ...Auth,
    ...Common,
    ...androidPermissionsProvider,
    ...PushProvider,
    // ...Storage,
    //  ...Api,
    //  ...AppState,
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
