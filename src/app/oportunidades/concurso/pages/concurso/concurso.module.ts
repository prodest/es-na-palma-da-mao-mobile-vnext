import { NgModule } from '@angular/core';
import { DateFormatPipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { ConcursoPage } from './concurso';

import { ModulePageComponentModule, LargeButtonComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [ConcursoPage],
  imports: [
    ModulePageComponentModule,
    LargeButtonComponentModule,
    DateFormatPipeModule,
    IonicPageModule.forChild(ConcursoPage)
  ]
})
export class ConcursosPageModule { }
