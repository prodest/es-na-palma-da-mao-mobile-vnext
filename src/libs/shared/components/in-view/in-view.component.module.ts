import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { InViewComponent } from './in-view.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [InViewComponent],
  exports: [InViewComponent]
})
export class InViewComponentModule {}
