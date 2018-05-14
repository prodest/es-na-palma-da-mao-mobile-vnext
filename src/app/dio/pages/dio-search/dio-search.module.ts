import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DioSearchPage } from './dio-search';
import { RemarkComponent } from './../../../layout/messages/remark/remark.component';
import { HighlightComponent } from './../../../layout/messages/highlight/highlight.component';

@NgModule({
  declarations: [DioSearchPage, RemarkComponent, HighlightComponent],
  imports: [IonicPageModule.forChild(DioSearchPage)]
})
export class DioSearchPageModule {}
