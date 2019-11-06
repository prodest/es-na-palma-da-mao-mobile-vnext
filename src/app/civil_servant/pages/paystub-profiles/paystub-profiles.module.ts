import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubPage } from './paystub-profiles';
import { ModulePageComponentModule } from '@espm/shared';

@NgModule({
  declarations: [
    PaystubPage,
  ],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(PaystubPage),
  ],
})
export class PaystubPageModule {}
