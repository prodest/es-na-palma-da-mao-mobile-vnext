import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsListFilterPage } from './news-list-filter';

@NgModule({
  declarations: [NewsListFilterPage],
  imports: [IonicPageModule.forChild(NewsListFilterPage)]
})
export class NewsListFilterPageModule {}
