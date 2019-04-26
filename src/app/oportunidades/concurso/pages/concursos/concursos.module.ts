import { NgModule } from '@angular/core';
import { HighlightModule, RemarkModule } from '@espm/shared/components';
import { IonicPageModule } from 'ionic-angular';

import { ConcursoStatusComponentModule } from '../../../components';
import { ConcursosPage } from './concursos';

@NgModule({
  declarations: [ConcursosPage],
  imports: [ConcursoStatusComponentModule, HighlightModule, RemarkModule, IonicPageModule.forChild(ConcursosPage)]
})
export class ConcursosPageModule {}
