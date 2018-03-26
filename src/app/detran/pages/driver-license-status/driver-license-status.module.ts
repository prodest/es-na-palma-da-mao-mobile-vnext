import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DriverStatusComponentModule, TicketsComponentModule } from '../../components';
import { DriverLicenseStatusPage } from './driver-license-status';

@NgModule({
  declarations: [DriverLicenseStatusPage],
  imports: [TicketsComponentModule, DriverStatusComponentModule, IonicPageModule.forChild(DriverLicenseStatusPage)]
})
export class DriverLicenseStatusPageModule {}
