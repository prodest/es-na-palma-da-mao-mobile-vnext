import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { HighlightComponent } from './highlight.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [HighlightComponent],
  exports: [HighlightComponent]
})
export class HighlightModule {}
