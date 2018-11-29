import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { ConcursoStatusComponentModule } from '../../components';
@NgModule({
  declarations: [SearchPage],
  imports: [ConcursoStatusComponentModule, IonicPageModule.forChild(SearchPage)]
})
export class SearchPageModule {}
