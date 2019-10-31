import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubPage } from './paystub';

@NgModule({
  declarations: [
    PaystubPage,
  ],
  imports: [
    IonicPageModule.forChild(PaystubPage),
  ],
})
export class PaystubPageModule {}
