import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  DefaultItemComponentModule,
  LastUpdateComponentModule,
  PieChartComponentModule,
  ReportListSummaryComponentModule,
  ReportTitleComponentModule
} from '../../components';
import { ExpensesByAreaPage } from './expenses-by-area';

@NgModule({
  declarations: [ExpensesByAreaPage],
  imports: [
    IonicPageModule.forChild(ExpensesByAreaPage),
    DefaultItemComponentModule,
    ReportListSummaryComponentModule,
    LastUpdateComponentModule,
    ReportTitleComponentModule,
    PieChartComponentModule
  ]
})
export class ExpensesByAreaPageModule {}
