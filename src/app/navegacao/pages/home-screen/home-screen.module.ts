import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeScreenPage } from './home-screen';

import { LargeHeaderComponentModule } from './../../components/large-header';
import { LargeButtonComponentModule } from '@espm/shared/components/large-button';

@NgModule({
  declarations: [HomeScreenPage],
  imports: [
    IonicPageModule.forChild(HomeScreenPage),
    LargeHeaderComponentModule,
    LargeButtonComponentModule
  ]
})
export class HomeScreenPageModule {}
