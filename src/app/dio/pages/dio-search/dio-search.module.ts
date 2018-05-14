import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DioSearchPage } from './dio-search';
import { RemarkModule } from '@espm/shared/components/remark/remark.module';
import { HighlightModule } from '@espm/shared/components/highlight/highlight.module';

@NgModule({
  declarations: [DioSearchPage],
  imports: [RemarkModule, HighlightModule, IonicPageModule.forChild(DioSearchPage)]
})
export class DioSearchPageModule {}
