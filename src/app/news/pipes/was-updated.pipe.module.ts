import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { WasUpdatedPipe } from './was-updated.pipe';

@NgModule({
  declarations: [WasUpdatedPipe],
  imports: [CommonModule, IonicModule],
  exports: [WasUpdatedPipe]
})
export class WasUpdatedPipeModule {}
