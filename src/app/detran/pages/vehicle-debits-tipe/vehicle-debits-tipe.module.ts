import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DebitsComponentModule, VehicleComponentModule } from '../../components';
import { VehicleDebitsTipePage } from './vehicle-debits-tipe';

@NgModule({
  declarations: [VehicleDebitsTipePage],
  imports: [DebitsComponentModule, VehicleComponentModule, IonicPageModule.forChild(VehicleDebitsTipePage)]
})
export class VehicleDebitsTipePageModule {}
