import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TransparencyDashboardPage } from './transparency-dashboard';
import { ModulePageComponentModule, ModuleIndexComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [TransparencyDashboardPage],
  imports: [ModulePageComponentModule, ModuleIndexComponentModule, IonicPageModule.forChild(TransparencyDashboardPage)]
})
export class TransparencyDashboardPageModule {}
