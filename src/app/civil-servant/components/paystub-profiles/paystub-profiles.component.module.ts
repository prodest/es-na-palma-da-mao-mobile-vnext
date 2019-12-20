import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubProfilesComponent } from './paystub-profiles.component';

@NgModule({
  declarations: [
    PaystubProfilesComponent,
  ],
  imports: [
    IonicPageModule
  ],
  exports: [
    PaystubProfilesComponent,
  ]
})
export class PaystubProfilesComponentModule { }
