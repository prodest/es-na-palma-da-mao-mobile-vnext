import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranscolOnlineRealTimePage } from './transcol-online-real-time';
import { DistanceFormatPipeModule } from '@espm/shared/pipes';

@NgModule({
  declarations: [
    TranscolOnlineRealTimePage,
  ],
  imports: [
    IonicPageModule.forChild(TranscolOnlineRealTimePage),
    DistanceFormatPipeModule
  ],
})
export class TranscolOnlineRealTimePageModule {}
