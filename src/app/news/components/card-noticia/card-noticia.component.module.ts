import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FromNowPipeModule } from '@espm/shared/pipes';
import { IonicModule } from 'ionic-angular';

import { WasUpdatedPipeModule } from './../../pipes';
import { CardNoticiaComponent } from './card-noticia.component';

@NgModule({
  declarations: [CardNoticiaComponent],
  imports: [CommonModule, FromNowPipeModule, WasUpdatedPipeModule, IonicModule],
  exports: [CardNoticiaComponent]
})
export class CardNoticiaComponentModule {}
