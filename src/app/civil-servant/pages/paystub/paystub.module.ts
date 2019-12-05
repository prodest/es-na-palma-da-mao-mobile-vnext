import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubPage } from './paystub';
import { ModulePageComponentModule } from '@espm/shared';
import { PaycheckSheetComponentModule } from '../../components/paycheck-sheet';
import { PaystubProfilesComponentModule } from '../../components/paystub-profiles';
import { PaystubLinksComponentModule } from '../../components/paystub-links';
import { PaystubDownloadComponentModule } from '../../components/paystub-download';
import { PaystubApiService } from '../../providers/paystub.api.service'

@NgModule({
  declarations: [
    PaystubPage,
  ],
  imports: [
    ModulePageComponentModule,
    PaycheckSheetComponentModule,
    IonicPageModule.forChild(PaystubPage),
    PaystubProfilesComponentModule,
    PaystubLinksComponentModule,
    PaystubDownloadComponentModule,
  ],
  providers: [
    PaystubApiService,
  ]
})
export class PaystubPageModule { }
