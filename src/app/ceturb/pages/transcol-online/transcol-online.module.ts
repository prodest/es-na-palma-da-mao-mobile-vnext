import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  GeolocationStatusModule,
  LinePrevisionsComponentModule,
  OriginPrevisionsComponentModule,
  RoutePrevisionsComponentModule,
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
    RoutePrevisionsComponentModule,
    IonicPageModule.forChild(TranscolOnlinePage)
  ]
})
export class TranscolOnlinePageModule {}
