import { NgModule } from '@angular/core';
import { ValidationMessageModule } from '@espm/shared';
import { IonicPageModule } from 'ionic-angular';

import { AddDriverLicensePage } from './add-driver-license';

@NgModule({
  imports: [ValidationMessageModule, IonicPageModule.forChild(AddDriverLicensePage)],
  declarations: [AddDriverLicensePage]
})
export class AddDriverLicensePageModule {}
