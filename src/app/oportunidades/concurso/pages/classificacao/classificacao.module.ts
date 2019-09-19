import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassificacaoPage } from './classificacao';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [
    ClassificacaoPage,
  ],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(ClassificacaoPage),
  ],
})
export class ClassificacaoPageModule {}
