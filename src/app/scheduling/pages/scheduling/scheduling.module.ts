import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextMaskModule } from 'angular2-text-mask';
import { SchedulingPage } from './scheduling';
import { Keyboard } from '@ionic-native/keyboard';


import { ModulePageComponentModule } from '@espm/shared/components';  


@NgModule({
  declarations: [
    SchedulingPage
  ],
  imports: [
    TextMaskModule,
    IonicPageModule.forChild(SchedulingPage),
    ModulePageComponentModule
  ],
  providers: [Keyboard]
})
export class SchedulingPageModule {}
