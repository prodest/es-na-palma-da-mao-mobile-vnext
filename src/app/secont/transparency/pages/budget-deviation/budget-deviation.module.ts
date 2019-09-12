import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  BudgetDeviationItemComponentModule,
  BarChartComponentModule,
  ReportListSummaryComponentModule,
  ReportTitleComponentModule
} from '../../components';
import { BudgetDeviationPage } from './budget-deviation';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [BudgetDeviationPage],
  imports: [
    IonicPageModule.forChild(BudgetDeviationPage),
    BudgetDeviationItemComponentModule,
    BarChartComponentModule,
    ReportTitleComponentModule,
    ReportListSummaryComponentModule,
    ModulePageComponentModule
  ]
})
export class BudgetDeviationPageModule {}
