import { DateFormatPipeModule } from '@espm/shared/pipes';
import { DetalheOportunidadePage } from './detalhe-oportunidade';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [DetalheOportunidadePage],
  imports: [ModulePageComponentModule, DateFormatPipeModule, IonicPageModule.forChild(DetalheOportunidadePage)]
})
export class ConcursosPageModule {}
