import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentationEdocsPage } from './presentation-edocs';

import { ModuleIndexComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [
    PresentationEdocsPage,
  ],
  imports: [
    IonicPageModule.forChild(PresentationEdocsPage),
    ModuleIndexComponentModule
  ],
})
export class PresentationEdocsPageModule {}
