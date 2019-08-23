import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultSchedulingPage } from './consult-scheduling';

@NgModule({
  declarations: [
    ConsultSchedulingPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultSchedulingPage),
  ],
})
export class ConsultSchedulingPageModule {}
