import { NgModule } from '@angular/core';
import { CapitalizePipeModule, DateFormatPipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { DetranPipesModule } from '../../pipes';
import { DebitsComponent } from './debits.component';
import { LargeButtonComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [DebitsComponent],
  imports: [LargeButtonComponentModule, IonicPageModule, DetranPipesModule, CapitalizePipeModule, DateFormatPipeModule],
  exports: [DebitsComponent]
})
export class DebitsComponentModule {}
