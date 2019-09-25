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
import { ModulePageComponentModule } from '@espm/shared/components';
import { LimitPipeModule } from '@espm/shared/pipes';

@NgModule({
  declarations: [RevenueDetailsPage],
  imports: [
    IonicPageModule.forChild(RevenueDetailsPage),
    DefaultItemComponentModule,
    ReportListSummaryComponentModule,
    ReportTitleComponentModule,
    PieChartComponentModule,
    LastUpdateComponentModule,
    ModulePageComponentModule,
    LimitPipeModule
  ]
})
export class RevenueDetailsPageModule { }
