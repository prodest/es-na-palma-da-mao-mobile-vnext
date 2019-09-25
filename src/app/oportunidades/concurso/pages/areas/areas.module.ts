import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AreasPage } from './areas';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [AreasPage],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(AreasPage)
  ]
})
export class AreasPageModule {}
