import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { VehicleComponentModule } from '../../components';
import { VehiclesPage } from './vehicles';
import { NavHeaderComponentModule, MainFooterBarComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [VehiclesPage],
  imports: [
    VehicleComponentModule,
    IonicPageModule.forChild(VehiclesPage),
    NavHeaderComponentModule,
    MainFooterBarComponentModule
  ]
})
export class VehiclesPageModule {}
