import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CardNoticiaComponent } from './card-noticia.component';
import { FromNowPipeModule } from '@espm/shared/pipes';

@NgModule({
  declarations: [CardNoticiaComponent],
  imports: [CommonModule, FromNowPipeModule, IonicModule],
  exports: [CardNoticiaComponent]
})
export class CardNoticiaComponentModule {}
