import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsListPage } from './news-list';
import { FromNowPipeModule } from '@espm/shared/pipes';
import { RemarkModule } from '@espm/shared/components';

@NgModule({
  declarations: [NewsListPage],
  imports: [FromNowPipeModule, RemarkModule, IonicPageModule.forChild(NewsListPage)]
})
export class NewsListPageModule {}
