import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  LastUpdateComponentModule,
  PieChartComponentModule,
  PublicWorksByCityItemComponentModule,
  ReportListSummaryComponentModule,
  ReportTitleComponentModule
} from '../../components';
import { PublicWorksByCityPage } from './public-works-by-city';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [PublicWorksByCityPage],
  imports: [
    IonicPageModule.forChild(PublicWorksByCityPage),
    PublicWorksByCityItemComponentModule,
    ReportListSummaryComponentModule,
    LastUpdateComponentModule,
    PieChartComponentModule,
    ReportTitleComponentModule,
    PieChartComponentModule,
    ReportTitleComponentModule,
    ModulePageComponentModule
  ]
})
export class PublicWorksByCityPageModule {}
