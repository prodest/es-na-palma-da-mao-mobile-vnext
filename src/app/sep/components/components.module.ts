import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FavoriteProtocolsComponent } from './favorite-protocols/favorite-protocols';
import { ProtocolDetailsComponent } from './protocol-details/protocol-details';
@NgModule({
  declarations: [FavoriteProtocolsComponent, ProtocolDetailsComponent],
  imports: [CommonModule, IonicModule],
  exports: [FavoriteProtocolsComponent, ProtocolDetailsComponent]
})
export class ComponentsModule {}
