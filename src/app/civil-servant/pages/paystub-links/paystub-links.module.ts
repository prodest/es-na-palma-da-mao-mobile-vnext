import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubLinksPage } from './paystub-links';
import { ModulePageComponentModule } from '@espm/shared';
import { LinksStatusComponentModule } from '../../components/links-status';

@NgModule({
  declarations: [
    PaystubLinksPage,
  ],
  imports: [
    LinksStatusComponentModule,
    ModulePageComponentModule,
    IonicPageModule.forChild(PaystubLinksPage),
  ],
})
export class PaystubLinksPageModule {}
