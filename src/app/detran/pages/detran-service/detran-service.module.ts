import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetranServicePage } from './detran-service';

import { ModuleIndexComponentModule  } from '@espm/shared/components';

@NgModule({
  declarations: [
    DetranServicePage,
  ],
  imports: [
    IonicPageModule.forChild(DetranServicePage),
    ModuleIndexComponentModule
  ],
})
export class DetranServicePageModule {}
