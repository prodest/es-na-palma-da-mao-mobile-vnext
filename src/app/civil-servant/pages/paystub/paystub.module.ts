import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubPage } from './paystub';
import { ModulePageComponentModule } from '@espm/shared';
import { SiarhesProfilesComponentModule } from '../../components/siarhes-profiles';
import { SiarhesLinksComponentModule } from '../../components/siarhes-links';
import { PaystubDownloadComponentModule } from '../../components/paystub-download';
import { SiarhesService, SiarhesApiService } from '../../providers/';

@NgModule({
  declarations: [
    PaystubPage,
  ],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(PaystubPage),
    SiarhesProfilesComponentModule,
    SiarhesLinksComponentModule,
    PaystubDownloadComponentModule,
  ],
  providers: [
    SiarhesService,
    SiarhesApiService,
  ]
})
export class PaystubPageModule { }
