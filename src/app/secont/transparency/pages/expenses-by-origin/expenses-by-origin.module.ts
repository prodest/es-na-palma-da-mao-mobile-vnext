import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  DefaultItemComponentModule,
  LastUpdateComponentModule,
  PieChartComponentModule,
  ReportListSummaryComponentModule,
  ReportTitleComponentModule
} from '../../components';
import { ExpensesByOriginPage } from './expenses-by-origin';

@NgModule({
  declarations: [ExpensesByOriginPage],
  imports: [
    IonicPageModule.forChild(ExpensesByOriginPage),
    DefaultItemComponentModule,
    ReportTitleComponentModule,
    PieChartComponentModule,
    LastUpdateComponentModule,
    ReportListSummaryComponentModule,
    LastUpdateComponentModule
  ]
})
export class ExpensesByAreaPageModule {}
