import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentationPage } from './presentation';

import { ModuleIndexComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [
    PresentationPage,
  ],
  imports: [
    IonicPageModule.forChild(PresentationPage),
    ModuleIndexComponentModule
  ],
})
export class PresentationPageModule {}
