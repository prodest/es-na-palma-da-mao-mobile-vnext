import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubProfilesPage } from './paystub-profiles';
import { ModulePageComponentModule } from '@espm/shared';

@NgModule({
  declarations: [
    PaystubProfilesPage,
  ],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(PaystubProfilesPage),
  ],
})
export class PaystubPageModule {}
