import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextMaskModule } from 'angular2-text-mask';
import { SchedulingPage } from './scheduling';
import { Keyboard } from '@ionic-native/keyboard';


@NgModule({
  declarations: [
    SchedulingPage
  ],
  imports: [
    TextMaskModule,
    IonicPageModule.forChild(SchedulingPage),
  ],
  providers: [Keyboard]
})
export class SchedulingPageModule {}
