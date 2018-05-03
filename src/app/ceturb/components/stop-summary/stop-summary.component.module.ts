import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { StopIconComponentModule } from '../stop-icon';
import { StopSummaryComponent } from './stop-summary.component';

@NgModule({
  declarations: [StopSummaryComponent],
  imports: [IonicPageModule, StopIconComponentModule],
  exports: [StopSummaryComponent]
})
export class StopSummaryComponentModule {}
