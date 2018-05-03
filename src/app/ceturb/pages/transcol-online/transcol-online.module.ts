import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  GeolocationStatusModule,
  LinePrevisionsComponentModule,
  OriginPrevisionsComponentModule,
  StopSummaryComponentModule
} from '../../components';
import { TranscolOnlinePage } from './transcol-online';

@NgModule({
  declarations: [TranscolOnlinePage],
  imports: [
    GeolocationStatusModule,
    OriginPrevisionsComponentModule,
    StopSummaryComponentModule,
    LinePrevisionsComponentModule,
    IonicPageModule.forChild(TranscolOnlinePage)
  ]
})
export class TranscolOnlinePageModule {}
