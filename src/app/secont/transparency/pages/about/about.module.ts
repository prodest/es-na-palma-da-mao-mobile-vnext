import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchHeightDirectiveModule } from '@espm/shared';
import { ModulePageComponentModule } from '@espm/shared/components';

import { AboutPage } from './about';

@NgModule({
  declarations: [AboutPage],
  imports: [IonicPageModule.forChild(AboutPage), MatchHeightDirectiveModule, ModulePageComponentModule]
})
export class AboutPageModule {}
