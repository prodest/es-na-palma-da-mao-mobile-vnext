import { NgModule } from '@angular/core';
import { NgSubscribeDirectiveModule } from '@espm/shared/directives';
import { IonicPageModule } from 'ionic-angular';

import { LatestEditionsPage } from './latest-editions';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [LatestEditionsPage],
  imports: [ModulePageComponentModule, NgSubscribeDirectiveModule, IonicPageModule.forChild(LatestEditionsPage)]
})
export class LatestEditionsPageModule {}
