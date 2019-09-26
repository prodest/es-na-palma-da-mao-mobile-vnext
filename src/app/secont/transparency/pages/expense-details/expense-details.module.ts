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
import { ModulePageComponentModule } from '@espm/shared/components';
import { LimitPipeModule } from '@espm/shared/pipes';

@NgModule({
  declarations: [ExpenseDetailsPage],
  imports: [
    IonicPageModule.forChild(ExpenseDetailsPage),
    LimitPipeModule ,
    DefaultItemComponentModule,
    ReportListSummaryComponentModule,
    LastUpdateComponentModule,
    PieChartComponentModule,
    ReportTitleComponentModule,
    ModulePageComponentModule
  ]
})
export class ExpenseDetailsPageModule {}
