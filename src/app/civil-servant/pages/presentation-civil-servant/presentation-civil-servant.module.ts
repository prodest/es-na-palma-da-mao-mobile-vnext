import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentationCivilServantPage } from './presentation-civil-servant';

import { ModuleIndexComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [
    PresentationCivilServantPage,
  ],
  imports: [
    IonicPageModule.forChild(PresentationCivilServantPage),
    ModuleIndexComponentModule
  ],
})
export class PresentationCivilServantPageModule { }
