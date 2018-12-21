import { NgModule } from '@angular/core';
import { CapitalizePipeModule, DateFormatPipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { DetranPipesModule } from '../../pipes';
import { DebitsComponent } from './debits.component';

@NgModule({
  declarations: [DebitsComponent],
  imports: [IonicPageModule, DetranPipesModule, CapitalizePipeModule, DateFormatPipeModule],
  exports: [DebitsComponent]
})
export class DebitsComponentModule {}
