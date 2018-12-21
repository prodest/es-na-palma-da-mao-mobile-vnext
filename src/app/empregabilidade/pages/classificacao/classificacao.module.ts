import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassificacaoPage } from './classificacao';

@NgModule({
  declarations: [
    ClassificacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassificacaoPage),
  ],
})
export class ClassificacaoPageModule {}
