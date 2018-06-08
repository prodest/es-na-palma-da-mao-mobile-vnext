import { NgModule } from '@angular/core';
import { MatchHeightDirectiveModule } from '@espm/shared';
import { IonicPageModule } from 'ionic-angular';

import { AboutPage } from './about';

@NgModule({
  declarations: [AboutPage],
  imports: [IonicPageModule.forChild(AboutPage), MatchHeightDirectiveModule]
})
export class AboutPageModule {}
