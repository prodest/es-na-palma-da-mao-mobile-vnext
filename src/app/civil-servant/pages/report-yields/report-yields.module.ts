import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportYieldsPage } from './report-yields';
import { ModulePageComponentModule } from '@espm/shared';
import { PaystubProfilesComponentModule } from '../../components/paystub-profiles';
import { PaystubLinksComponentModule } from '../../components/paystub-links';
import { PaystubService } from '../../providers/paystub.service';
import { PaystubApiService } from '../../providers/paystub.api.service'
import { ReportYieldsService, ReportYieldsApiService } from '../../providers';
import { ReportYieldsDownloadComponentModule } from '../../components/report-yields-download';
import { ReportYieldsDownloadFormModule } from '../../components/report-yields-download-form';

@NgModule({
  declarations: [
    ReportYieldsPage,
  ],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(ReportYieldsPage),
    PaystubProfilesComponentModule,
    PaystubLinksComponentModule,
    ReportYieldsDownloadComponentModule,
    ReportYieldsDownloadFormModule
  ],
  providers: [
    PaystubService,
    PaystubApiService,
    ReportYieldsService,
    ReportYieldsApiService,
  ]
})
export class ReportYieldsPageModule { }
