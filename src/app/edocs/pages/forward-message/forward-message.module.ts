import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForwardMessagePage } from './forward-message';

@NgModule({
  declarations: [ForwardMessagePage],
  imports: [
    IonicPageModule.forChild(ForwardMessagePage),
  ],
})
export class ForwardMessagePageModule {}