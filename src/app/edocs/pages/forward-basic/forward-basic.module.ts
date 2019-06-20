import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForwardBasicPage } from './forward-basic';

@NgModule({
  declarations: [ForwardBasicPage],
  imports: [
    IonicPageModule.forChild(ForwardBasicPage),
  ],
})
export class ForwardBasicPageModule {}