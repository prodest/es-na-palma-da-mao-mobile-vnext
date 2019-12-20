import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubLinksComponent } from './paystub-links.component';
import { LinksStatusComponentModule } from '../links-status';

@NgModule({
  declarations: [
    PaystubLinksComponent,
  ],
  imports: [
    LinksStatusComponentModule,
    IonicPageModule,
  ],
  exports: [
    PaystubLinksComponent,
  ]
})
export class PaystubLinksComponentModule { }
