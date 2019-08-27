import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {
  DefaultItemComponentModule,
  LastUpdateComponentModule,
  PieChartComponentModule,
  ReportListSummaryComponentModule,
  ReportTitleComponentModule
} from '../../components';
import { PublicWorksPage } from './public-works';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [PublicWorksPage],
  imports: [
    IonicPageModule.forChild(PublicWorksPage),
    DefaultItemComponentModule,
    ReportListSummaryComponentModule,
    ReportTitleComponentModule,
    PieChartComponentModule,
    LastUpdateComponentModule,
    ModulePageComponentModule
  ]
})
export class PublicWorksPageModule {}
