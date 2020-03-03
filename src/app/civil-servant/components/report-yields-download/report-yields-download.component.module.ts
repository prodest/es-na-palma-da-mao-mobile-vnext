import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportYieldsDownloadComponent } from './report-yields-download.component';
import { ModulePageComponentModule } from '@espm/shared';
import { ReportYieldsDownloadFormModule } from '../report-yields-download-form';

@NgModule({
  declarations: [
    ReportYieldsDownloadComponent,
  ],
  imports: [
    ModulePageComponentModule,
    ReportYieldsDownloadFormModule,
    IonicPageModule,
  ],
  exports: [
    ReportYieldsDownloadComponent,
  ]
})
export class ReportYieldsDownloadComponentModule { }
