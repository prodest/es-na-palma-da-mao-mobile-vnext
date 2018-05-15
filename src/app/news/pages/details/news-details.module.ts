import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FromNowPipeModule } from '@espm/shared/pipes';
import { NewsDetailsPage } from './news-details';

@NgModule({
  declarations: [NewsDetailsPage],
  imports: [FromNowPipeModule, IonicPageModule.forChild(NewsDetailsPage)]
})
export class NewsDetailsPageModule {}
