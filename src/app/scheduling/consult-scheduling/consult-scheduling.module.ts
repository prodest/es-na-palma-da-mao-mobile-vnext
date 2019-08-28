import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultSchedulingPage } from './consult-scheduling';

import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [
    ConsultSchedulingPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultSchedulingPage),
    ModulePageComponentModule
  ],
})
export class ConsultSchedulingPageModule {}
