import { NgModule } from '@angular/core';
import { ValidationMessageModule } from '@espm/shared';
import { IonicPageModule } from 'ionic-angular';

import { AddVehiclePage } from './add-vehicle';

@NgModule({
  imports: [ValidationMessageModule, IonicPageModule.forChild(AddVehiclePage)],
  declarations: [AddVehiclePage]
})
export class AddVehiclePageModule {}
