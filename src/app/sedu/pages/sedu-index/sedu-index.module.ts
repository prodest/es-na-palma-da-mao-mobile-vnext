import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeduIndexPage } from './sedu-index';
import { ModuleIndexComponentModule } from '@espm/shared';

@NgModule({
  declarations: [
    SeduIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(SeduIndexPage),
    ModuleIndexComponentModule,
  ],
})
export class SeduIndexPageModule {}
