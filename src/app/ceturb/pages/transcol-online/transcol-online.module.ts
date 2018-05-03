import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GeolocationStatusModule, StopSummaryComponentModule } from '../../components';
import { TranscolOnlinePage } from './transcol-online';

@NgModule({
  declarations: [TranscolOnlinePage],
  imports: [GeolocationStatusModule, StopSummaryComponentModule, IonicPageModule.forChild(TranscolOnlinePage)]
})
export class TranscolOnlinePageModule {}
