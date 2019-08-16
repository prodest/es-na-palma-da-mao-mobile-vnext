import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DebitsComponentModule, VehicleComponentModule } from '../../components';
import { VehicleDebitsTipePage } from './vehicle-debits-tipe';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [VehicleDebitsTipePage],
  imports: [ModulePageComponentModule, DebitsComponentModule, VehicleComponentModule, IonicPageModule.forChild(VehicleDebitsTipePage)]
})
export class VehicleDebitsTipePageModule {}
