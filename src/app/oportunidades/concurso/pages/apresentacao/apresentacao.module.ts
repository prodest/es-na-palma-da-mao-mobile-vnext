import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApresentacaoPage } from './apresentacao';
import { ModuleIndexComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [ApresentacaoPage],
  imports: [
    ModuleIndexComponentModule,
    IonicPageModule.forChild(ApresentacaoPage)
  ]
})
export class ApresentacaoPageModule {}
