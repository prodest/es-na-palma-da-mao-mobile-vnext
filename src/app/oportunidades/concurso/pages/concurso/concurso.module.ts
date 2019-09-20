import { NgModule } from '@angular/core';
import { DateFormatPipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { ConcursoPage } from './concurso';

import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [ConcursoPage],
  imports: [ModulePageComponentModule, DateFormatPipeModule, IonicPageModule.forChild(ConcursoPage)]
})
export class ConcursosPageModule { }
