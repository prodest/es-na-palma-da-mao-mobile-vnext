import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FromNowPipeModule } from '@espm/shared/pipes';
import { IonicModule } from 'ionic-angular';

import { NewsListItemComponent } from './news-list-item.component';

@NgModule({
  declarations: [NewsListItemComponent],
  imports: [CommonModule, FromNowPipeModule, IonicModule],
  exports: [NewsListItemComponent]
})
export class NewsListItemComponentModule {}
