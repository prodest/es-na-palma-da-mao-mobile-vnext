import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DriverLicensePage } from './driver-license';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [DriverLicensePage],
  imports: [IonicPageModule.forChild(DriverLicensePage), ModulePageComponentModule]
})
export class DriverLicensePageModule {}
