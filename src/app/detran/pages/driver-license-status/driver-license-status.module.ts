import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DriverStatusComponentModule, TicketsComponentModule } from '../../components';
import { DriverLicenseStatusPage } from './driver-license-status';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [DriverLicenseStatusPage],
  imports: [
    ModulePageComponentModule,
    TicketsComponentModule,
    DriverStatusComponentModule,
    IonicPageModule.forChild(DriverLicenseStatusPage)
  ]
})
export class DriverLicenseStatusPageModule {}
