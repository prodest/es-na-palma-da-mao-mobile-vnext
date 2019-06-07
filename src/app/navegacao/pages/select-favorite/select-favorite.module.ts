import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectFavoritePage } from './select-favorite';

@NgModule({
  declarations: [
    SelectFavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectFavoritePage),
  ],
})
export class SelectFavoritePageModule {}
