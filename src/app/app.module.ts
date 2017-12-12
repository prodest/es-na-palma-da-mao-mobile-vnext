import { ErrorHandler, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CoreModule } from '@espm/core'
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { IonicStorageModule } from '@ionic/storage'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'

import { ESPM } from './app.component'

@NgModule( {
    declarations: [ ESPM ],
    imports: [
        BrowserModule,
        CoreModule,
        IonicStorageModule.forRoot( {
            name: 'espm',
            driverOrder: [ 'indexeddb', 'sqlite', 'websql' ]
        } ),
        IonicModule.forRoot( ESPM )
    ],
    bootstrap: [ IonicApp ],
    entryComponents: [ ESPM ],
    providers: [
        StatusBar,
        SplashScreen,
        GooglePlus,
        Facebook,
        InAppBrowser,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
} )
export class EspmModule { }
