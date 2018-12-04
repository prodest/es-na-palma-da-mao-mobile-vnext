import { NgModule } from '@angular/core';
import { RemarkModule } from '@espm/shared/components';
import { IonicPageModule } from 'ionic-angular';

import { NewsListItemComponentModule } from './../../components';
import { NewsListPage } from './news-list';

@NgModule({
  declarations: [NewsListPage],
  imports: [NewsListItemComponentModule, RemarkModule, IonicPageModule.forChild(NewsListPage)]
})
export class NewsListPageModule {}
