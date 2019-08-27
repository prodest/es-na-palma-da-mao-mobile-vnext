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
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [ExpensesByAreaPage],
  imports: [
    IonicPageModule.forChild(ExpensesByAreaPage),
    DefaultItemComponentModule,
    ReportListSummaryComponentModule,
    LastUpdateComponentModule,
    ReportTitleComponentModule,
    PieChartComponentModule,
    ModulePageComponentModule
  ]
})
export class ExpensesByAreaPageModule {}
