import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubPage } from './paystub';
import { ModulePageComponentModule } from '@espm/shared';
import { PaystubProfilesComponentModule } from '../../components/paystub-profiles';
import { PaystubLinksComponentModule } from '../../components/paystub-links';
import { PaystubDownloadComponentModule } from '../../components/paystub-download';
import { PaystubService } from '../../providers/paystub.service';
import { PaystubApiService } from '../../providers/paystub.api.service'

@NgModule({
  declarations: [
    PaystubPage,
  ],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(PaystubPage),
    PaystubProfilesComponentModule,
    PaystubLinksComponentModule,
    PaystubDownloadComponentModule,
  ],
  providers: [
    PaystubService,
    PaystubApiService,
  ]
})
export class PaystubPageModule { }
