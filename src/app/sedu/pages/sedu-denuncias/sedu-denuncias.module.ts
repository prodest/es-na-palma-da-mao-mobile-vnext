import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeduDenunciasPage } from './sedu-denuncias';
import { ModulePageComponentModule } from '@espm/shared';

@NgModule({
  declarations: [
    SeduDenunciasPage,
  ],
  imports: [
    IonicPageModule.forChild(SeduDenunciasPage),
    ModulePageComponentModule
  ],
})
export class SeduDenunciasPageModule {}
