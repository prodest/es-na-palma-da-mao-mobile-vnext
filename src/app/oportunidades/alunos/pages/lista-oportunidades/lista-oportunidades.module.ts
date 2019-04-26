import { NgModule } from '@angular/core';
import { DateFormatPipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { ListaOportunidadesPage } from './lista-oportunidades';
import { ConcursoStatusComponentModule } from '../../../components';

@NgModule({
  declarations: [ListaOportunidadesPage],
  imports: [ConcursoStatusComponentModule, DateFormatPipeModule, IonicPageModule.forChild(ListaOportunidadesPage)]
})
export class AlunosPageModule {}
