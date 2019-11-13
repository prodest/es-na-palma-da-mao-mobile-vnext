import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhasDenunciasPage } from './minhas-denuncias';
import { ModulePageComponentModule } from '@espm/shared';

@NgModule({
  declarations: [
    MinhasDenunciasPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhasDenunciasPage),
    ModulePageComponentModule,
  ],
})
export class MinhasDenunciasPageModule {}
