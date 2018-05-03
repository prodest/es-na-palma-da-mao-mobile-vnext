import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GeolocationStatusModule, OriginPrevisionsComponentModule, StopSummaryComponentModule } from '../../components';
import { TranscolOnlinePage } from './transcol-online';

@NgModule({
  declarations: [TranscolOnlinePage],
  imports: [
    GeolocationStatusModule,
    OriginPrevisionsComponentModule,
    StopSummaryComponentModule,
    IonicPageModule.forChild(TranscolOnlinePage)
  ]
})
export class TranscolOnlinePageModule {}
