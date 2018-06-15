import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  DefaultItemComponentModule,
  LastUpdateComponentModule,
  PieChartComponentModule,
  ReportListSummaryComponentModule,
  ReportTitleComponentModule
} from '../../components';
import { BudgetsPage } from './budgets';

@NgModule({
  declarations: [BudgetsPage],
  imports: [
    IonicPageModule.forChild(BudgetsPage),
    DefaultItemComponentModule,
    LastUpdateComponentModule,
    ReportTitleComponentModule,
    PieChartComponentModule,
    ReportListSummaryComponentModule
  ]
})
export class BudgetsPageModule {}
