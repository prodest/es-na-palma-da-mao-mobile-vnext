import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { RemarkComponent } from './remark.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [RemarkComponent],
  exports: [RemarkComponent]
})
export class RemarkModule {}
