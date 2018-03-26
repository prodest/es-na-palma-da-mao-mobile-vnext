import { NgModule } from '@angular/core';
import { CapitalizePipeModule, DateFormatPipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { DetranPipesModule } from '../../pipes';
import { TicketsComponent } from './tickets.component';

@NgModule({
  declarations: [TicketsComponent],
  imports: [IonicPageModule, DetranPipesModule, CapitalizePipeModule, DateFormatPipeModule],
  exports: [TicketsComponent]
})
export class TicketsComponentModule {}
