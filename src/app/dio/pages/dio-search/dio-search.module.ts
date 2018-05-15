import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DioSearchPage } from './dio-search';
import { HighlightModule, RemarkModule } from '@espm/shared/components';

@NgModule({
  declarations: [DioSearchPage],
  imports: [RemarkModule, HighlightModule, IonicPageModule.forChild(DioSearchPage)]
})
export class DioSearchPageModule {}
