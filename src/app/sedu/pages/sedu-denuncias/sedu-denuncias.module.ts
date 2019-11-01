import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeduDenunciasPage } from './sedu-denuncias';
import { ModulePageComponentModule, LargeButtonComponentModule } from '@espm/shared';

@NgModule({
  declarations: [
    SeduDenunciasPage,
  ],
  imports: [
    IonicPageModule.forChild(SeduDenunciasPage),
    ModulePageComponentModule,
    LargeButtonComponentModule
  ],
})
export class SeduDenunciasPageModule {}
