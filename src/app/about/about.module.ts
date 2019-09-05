import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [AboutPage],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(AboutPage)
  ]
})
export class AboutPageModule {}
