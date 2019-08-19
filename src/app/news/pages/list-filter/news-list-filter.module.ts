import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsListFilterPage } from './news-list-filter';

import { ModulePageComponentModule, LargeButtonComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [NewsListFilterPage],
  imports: [ModulePageComponentModule, LargeButtonComponentModule, IonicPageModule.forChild(NewsListFilterPage)]
})
export class NewsListFilterPageModule {}
