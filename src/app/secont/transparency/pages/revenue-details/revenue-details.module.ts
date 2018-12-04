import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  DefaultItemComponentModule,
  LastUpdateComponentModule,
  PieChartComponentModule,
  ReportListSummaryComponentModule,
  ReportTitleComponentModule
} from '../../components';
import { RevenueDetailsPage } from './revenue-details';

@NgModule({
  declarations: [RevenueDetailsPage],
  imports: [
    IonicPageModule.forChild(RevenueDetailsPage),
    DefaultItemComponentModule,
    ReportListSummaryComponentModule,
    ReportTitleComponentModule,
    PieChartComponentModule,
    LastUpdateComponentModule
  ]
})
export class RevenueDetailsPageModule {}
