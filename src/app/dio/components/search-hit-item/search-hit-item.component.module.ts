import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SearchHitItemComponent } from './search-hit-item.component';

@NgModule({
  declarations: [SearchHitItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [SearchHitItemComponent]
})
export class SearchHitItemComponentModule {}
