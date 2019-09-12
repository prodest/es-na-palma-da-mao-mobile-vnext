import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CardNoticiaComponentModule } from './../../components';
import { NewsHighlightsPage } from './news-highlights';

import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [NewsHighlightsPage],
  imports: [ModulePageComponentModule, CardNoticiaComponentModule, IonicPageModule.forChild(NewsHighlightsPage)]
})
export class NewsHighlightsPageModule {}
