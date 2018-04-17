import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GeolocationStatusModule } from '../../components';
import { TranscolOnlinePage } from './transcol-online';

@NgModule({
  declarations: [TranscolOnlinePage],
  imports: [GeolocationStatusModule, IonicPageModule.forChild(TranscolOnlinePage)]
})
export class TranscolOnlinePageModule {}
