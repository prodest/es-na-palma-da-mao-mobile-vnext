import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule, ionicConfig } from '@espm/core';
import { localeIdFactory, localeInitializer, LocaleService } from '@espm/core/locale/LocaleService';
import { AndroidPermissionsService } from '@espm/core/permissions';
import { ImageLoaderModule, MenuModule } from '@espm/shared';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import * as moment from 'moment';

import { AboutProviders } from './about/providers';
import { ESPMComponent } from './app.component';
import { CalendarProviders } from './calendar/providers';
import { CeturbProviders } from './ceturb/transcol-lines/providers';
import { TranscolOnlineProviders } from './ceturb/transcol-online/providers';
import { DetranProviders } from './detran/providers';
import { DioProviders } from './dio/providers';
import { NewsProviders } from './news/providers';
import { TransparencyProviders } from './secont/transparency/providers';
import { SepProviders } from './sep/providers';

moment.locale('pt-br');
registerLocaleData(ptBr);

@NgModule({
  declarations: [ESPMComponent],
  imports: [
    BrowserModule,
    CoreModule,
    MenuModule,
    IonicStorageModule.forRoot({ name: 'espm', driverOrder: ['localstorage'] }),
    IonicModule.forRoot(ESPMComponent, ionicConfig),
    ImageLoaderModule.forRoot({
      fallbackUrl: 'assets/imgs/no-img.png',
      fallbackAsPlaceholder: false,
      spinnerEnabled: true,
      spinnerName: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [ESPMComponent],
  providers: [
    LocaleService,
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    SocialSharing,
    InAppBrowser,
    AndroidPermissions,
    AndroidPermissionsService,
    BarcodeScanner,
    ...DetranProviders,
    ...CeturbProviders,
    ...TranscolOnlineProviders,
    ...DioProviders,
    ...NewsProviders,
    ...CalendarProviders,
    ...TransparencyProviders,
    ...SepProviders,
    ...AboutProviders,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useFactory: localeIdFactory, deps: [LocaleService] },
    { provide: APP_INITIALIZER, multi: true, useFactory: localeInitializer, deps: [LOCALE_ID] },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
