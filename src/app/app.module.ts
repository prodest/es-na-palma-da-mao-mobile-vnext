import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule, ionicConfig } from '@espm/core';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import * as moment from 'moment';

import { ESPM } from './app.component';
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
    ...SepProviders,
    ...TransparencyProviders,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class EspmModule {}
