import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

// import { VehicleComponentModule } from '../../components'
import { LatestEditionsPage } from './latest-editions';

@NgModule({
  declarations: [LatestEditionsPage],
  imports: [IonicPageModule.forChild(LatestEditionsPage)]
})
export class LatestEditionsPageModule {}
