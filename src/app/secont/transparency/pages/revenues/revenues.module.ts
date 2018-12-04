import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  DefaultItemComponentModule,
  ReportTitleComponentModule,
  PieChartComponentModule,
  LastUpdateComponentModule,
  ReportListSummaryComponentModule
} from '../../components';
import { RevenuesPage } from './revenues';

@NgModule({
  declarations: [RevenuesPage],
  imports: [
    IonicPageModule.forChild(RevenuesPage),
    DefaultItemComponentModule,
    ReportTitleComponentModule,
    ReportListSummaryComponentModule,
    PieChartComponentModule,
    LastUpdateComponentModule
  ]
})
export class RevenuesPageModule {}
