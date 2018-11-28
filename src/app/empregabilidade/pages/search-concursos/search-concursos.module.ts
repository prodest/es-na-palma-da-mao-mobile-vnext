import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchConcursosPage } from './search-concursos';
import { ConcursoStatusComponentModule } from '../../components';

@NgModule({
  declarations: [SearchConcursosPage],
  imports: [ConcursoStatusComponentModule, IonicPageModule.forChild(SearchConcursosPage)]
})
export class SearchConcursosPageModule {}