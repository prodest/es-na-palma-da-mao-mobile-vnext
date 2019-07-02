import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectFavoritePage } from './select-favorite';
import { MenuService } from '../../providers';

@NgModule({
  declarations: [SelectFavoritePage],
  imports: [IonicPageModule.forChild(SelectFavoritePage)],
  providers: [MenuService]
})
export class SelectFavoritePageModule {}
