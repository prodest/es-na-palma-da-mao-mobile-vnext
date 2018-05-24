import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { FavoriteComponent } from './favorite.component';
import { FavoritesComponent } from './favorites.component';

@NgModule({
  declarations: [FavoritesComponent, FavoriteComponent],
  imports: [IonicPageModule],
  exports: [FavoritesComponent]
})
export class FavoritesModule {}
