import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsDetailsPage } from './news-details';
import { CardNoticiaComponentModule } from './../../components';

@NgModule({
  declarations: [NewsDetailsPage],
  imports: [CardNoticiaComponentModule, IonicPageModule.forChild(NewsDetailsPage)]
})
export class NewsDetailsPageModule {}
