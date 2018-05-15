import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsDetailsPage } from './news-details';
import { NoticiaComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [NewsDetailsPage],
  imports: [NoticiaComponentsModule, IonicPageModule.forChild(NewsDetailsPage)]
})
export class NewsDetailsPageModule {}
