import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ValidationMessageModule } from '@espm/shared';
import { ReportYieldsDownloadFormComponent } from './report-yields-download-form.component'

@NgModule({
  declarations: [ReportYieldsDownloadFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    ValidationMessageModule
  ],
  exports: [ReportYieldsDownloadFormComponent],
  providers: [],
})
export class ReportYieldsDownloadFormModule { }
