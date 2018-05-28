import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranscolOnlineFeedbackPage } from './transcol-online-feedback';
import { FeedbackFormComponentModule } from './../../components';

@NgModule({
  declarations: [TranscolOnlineFeedbackPage],
  imports: [FeedbackFormComponentModule, IonicPageModule.forChild(TranscolOnlineFeedbackPage)]
})
export class TranscolOnlineFeedbackPageModule {}
