import { DateFormatPipeModule } from '@espm/shared/pipes';
import { DetalheOportunidadePage } from './detalhe-oportunidade';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [DetalheOportunidadePage],
  imports: [DateFormatPipeModule, IonicPageModule.forChild(DetalheOportunidadePage)]
})
export class ConcursosPageModule {}
