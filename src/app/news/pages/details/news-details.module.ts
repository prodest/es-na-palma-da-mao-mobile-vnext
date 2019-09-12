import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsDetailsPage } from './news-details';
import { CardNoticiaComponentModule } from './../../components';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [NewsDetailsPage],
  imports: [ModulePageComponentModule, CardNoticiaComponentModule, IonicPageModule.forChild(NewsDetailsPage)]
})
export class NewsDetailsPageModule {}
