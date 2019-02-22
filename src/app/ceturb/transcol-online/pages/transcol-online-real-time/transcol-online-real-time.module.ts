import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranscolOnlineRealTimePage } from './transcol-online-real-time';
import { DistanceFormatPipeModule } from '@espm/shared/pipes';
import { StopSummaryComponentModule } from '../../components';
import { BusStopAdapterPipeModule } from '../../pipes';

@NgModule({
  declarations: [
    TranscolOnlineRealTimePage,
  ],
  imports: [
    IonicPageModule.forChild(TranscolOnlineRealTimePage),
    DistanceFormatPipeModule,
    BusStopAdapterPipeModule,
    StopSummaryComponentModule
  ],
})
export class TranscolOnlineRealTimePageModule {}
