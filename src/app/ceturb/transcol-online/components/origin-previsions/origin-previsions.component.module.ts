import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DistanceFormatPipeModule } from '@espm/shared/pipes';
import { OriginPrevisionsComponent } from './origin-previsions.component';

@NgModule({
  declarations: [OriginPrevisionsComponent],
  imports: [IonicPageModule, DistanceFormatPipeModule],
  exports: [OriginPrevisionsComponent]
})
export class OriginPrevisionsComponentModule {}
