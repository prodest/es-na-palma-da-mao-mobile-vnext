import { NgModule } from '@angular/core';
import { DateFormatPipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { ConcursoPage } from './concurso';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ConcursoPage],
  imports: [DateFormatPipeModule, IonicPageModule.forChild(ConcursoPage),HttpClientModule], 
  
})
export class ConcursosPageModule {}
