import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TransparencyDashboardPage } from './transparency-dashboard';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [TransparencyDashboardPage],
  imports: [ModulePageComponentModule, IonicPageModule.forChild(TransparencyDashboardPage)]
})
export class TransparencyDashboardPageModule {}
