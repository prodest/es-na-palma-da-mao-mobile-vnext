import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { VehicleComponentModule } from '../../components';
import { VehiclesPage } from './vehicles';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [VehiclesPage],
  imports: [
    VehicleComponentModule,
    IonicPageModule.forChild(VehiclesPage),
    ModulePageComponentModule
  ]
})
export class VehiclesPageModule {}
