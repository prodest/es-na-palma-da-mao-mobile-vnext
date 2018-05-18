import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FavoriteProtocolComponent } from './favorite-protocol.component';

@NgModule({
  declarations: [FavoriteProtocolComponent],
  imports: [CommonModule, IonicModule],
  exports: [FavoriteProtocolComponent]
})
export class FavoriteProtocolComponentModule {}
