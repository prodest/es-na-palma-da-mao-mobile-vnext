import { NgModule } from '@angular/core';
import { NgSubscribeDirectiveModule } from '@espm/shared/directives';
import { IonicPageModule } from 'ionic-angular';

import { LatestEditionsPage } from './latest-editions';

@NgModule({
  declarations: [LatestEditionsPage],
  imports: [NgSubscribeDirectiveModule, IonicPageModule.forChild(LatestEditionsPage)]
})
export class LatestEditionsPageModule {}
