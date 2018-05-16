import { CommonModule } from '@angular/common';
import { NgModule, Input } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FavoriteProtocolComponent } from './favorite-protocol.component';

import { FavoriteProtocol } from './../../model';

@NgModule({
  declarations: [FavoriteProtocolComponent],
  imports: [CommonModule, IonicModule],
  exports: [FavoriteProtocolComponent]
})
export class FavoriteProtocolComponentModule {
  @Input() favoriteProcess: FavoriteProtocol;
}
