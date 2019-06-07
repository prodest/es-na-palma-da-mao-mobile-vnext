import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeScreenPage } from './home-screen';

import { LargeHeaderComponentModule } from './../../components/large-header';

@NgModule({
  declarations: [HomeScreenPage],
  imports: [
    IonicPageModule.forChild(HomeScreenPage),
    LargeHeaderComponentModule
  ]
})
export class HomeScreenPageModule {}
