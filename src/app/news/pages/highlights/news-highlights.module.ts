import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CardNoticiaComponentModule } from './../../components';
import { NewsHighlightsPage } from './news-highlights';

@NgModule({
  declarations: [NewsHighlightsPage],
  imports: [CardNoticiaComponentModule, IonicPageModule.forChild(NewsHighlightsPage)]
})
export class NewsHighlightsPageModule {}
