import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DebitsComponentModule, VehicleComponentModule } from '../../components';
import { VehicleDebitsPage } from './vehicle-debits';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [VehicleDebitsPage],
  imports: [ModulePageComponentModule, DebitsComponentModule, VehicleComponentModule, IonicPageModule.forChild(VehicleDebitsPage)]
})
export class VehicleDebitsPageModule {}
