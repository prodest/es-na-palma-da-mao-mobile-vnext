import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ReportListSummaryComponentModule } from '../report-list-summary';
import { DefaultItemComponentModule } from './../default-item';
import { ReportListComponent } from './report-list.component';

@NgModule({
  declarations: [ReportListComponent],
  imports: [IonicPageModule, ReportListSummaryComponentModule, DefaultItemComponentModule],
  exports: [ReportListComponent]
})
export class ReportListComponentModule {}
