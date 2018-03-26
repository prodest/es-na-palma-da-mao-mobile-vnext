import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { VehicleComponentModule } from '../../components';
import { VehiclesPage } from './vehicles';

@NgModule({
  declarations: [VehiclesPage],
  imports: [VehicleComponentModule, IonicPageModule.forChild(VehiclesPage)]
})
export class VehiclesPageModule {}
