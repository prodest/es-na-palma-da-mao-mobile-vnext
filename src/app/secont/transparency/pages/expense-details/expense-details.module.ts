import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  DefaultItemComponentModule,
  LastUpdateComponentModule,
  PieChartComponentModule,
  ReportListSummaryComponentModule,
  ReportTitleComponentModule
} from '../../components';
import { ExpenseDetailsPage } from './expense-details';

@NgModule({
  declarations: [ExpenseDetailsPage],
  imports: [
    IonicPageModule.forChild(ExpenseDetailsPage),
    DefaultItemComponentModule,
    ReportListSummaryComponentModule,
    LastUpdateComponentModule,
    PieChartComponentModule,
    ReportTitleComponentModule
  ]
})
export class ExpenseDetailsPageModule {}
