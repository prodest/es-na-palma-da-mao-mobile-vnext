import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportYieldsPage } from './report-yields';
import { ModulePageComponentModule } from '@espm/shared';
import { SiarhesProfilesComponentModule } from '../../components/siarhes-profiles';
import { SiarhesLinksComponentModule } from '../../components/siarhes-links';
import { SiarhesService, SiarhesApiService } from '../../providers';
import { ReportYieldsDownloadComponentModule } from '../../components/report-yields-download';
import { ReportYieldsDownloadFormModule } from '../../components/report-yields-download-form';

@NgModule({
  declarations: [
    ReportYieldsPage,
  ],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(ReportYieldsPage),
    SiarhesProfilesComponentModule,
    SiarhesLinksComponentModule,
    ReportYieldsDownloadComponentModule,
    ReportYieldsDownloadFormModule
  ],
  providers: [
    SiarhesService,
    SiarhesApiService,
  ]
})
export class ReportYieldsPageModule { }
