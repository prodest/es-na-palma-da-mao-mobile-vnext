import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsHighlightsPage } from './news-highlights';
import { CardNoticiaComponentModule } from './../../components';

@NgModule({
  declarations: [NewsHighlightsPage],
  imports: [CardNoticiaComponentModule, IonicPageModule.forChild(NewsHighlightsPage)]
})
export class NewsHighlightsPageModule {}
