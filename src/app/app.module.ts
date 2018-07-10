import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule, ionicConfig } from '@espm/core';
import { localeIdFactory, localeInitializer, LocaleService } from '@espm/core/locale/LocaleService';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import * as moment from 'moment';

import { ESPM } from './app.component';
import { CalendarProviders } from './calendar/providers';
import { CeturbProviders } from './ceturb/transcol-lines/providers';
import { TranscolOnlineProviders } from './ceturb/transcol-online/providers';
import { DetranProviders } from './detran/providers';
import { DioProviders } from './dio/providers';
import { NewsProviders } from './news/providers';
import { TransparencyProviders } from './secont/transparency/providers';

moment.locale('pt-br');
registerLocaleData(ptBr);

@NgModule({
  declarations: [ESPM],
  imports: [
    BrowserModule,
    CoreModule,
    IonicStorageModule.forRoot({ name: 'espm', driverOrder: ['localstorage'] }),
    IonicModule.forRoot(ESPM, ionicConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [ESPM],
  providers: [
    LocaleService,
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    InAppBrowser,
    ...DetranProviders,
    ...CeturbProviders,
    ...TranscolOnlineProviders,
    ...DioProviders,
    ...NewsProviders,
    ...CalendarProviders,
    ...TransparencyProviders,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useFactory: localeIdFactory, deps: [LocaleService] },
    { provide: APP_INITIALIZER, multi: true, useFactory: localeInitializer, deps: [LOCALE_ID] },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class EspmModule {}
