import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DebitsComponentModule, VehicleComponentModule } from '../../components';
import { VehicleDebitsPage } from './vehicle-debits';

@NgModule({
  declarations: [VehicleDebitsPage],
  imports: [DebitsComponentModule, VehicleComponentModule, IonicPageModule.forChild(VehicleDebitsPage)]
})
export class VehicleDebitsPageModule {}
