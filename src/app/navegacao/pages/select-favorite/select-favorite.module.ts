import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectFavoritePage } from './select-favorite';
import { MenuService } from '../../providers';
import { LargeHeaderComponentModule } from '../../components/large-header';

@NgModule({
  declarations: [
    SelectFavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectFavoritePage),
    LargeHeaderComponentModule
  ],
  providers: [
    MenuService
  ]
})
export class SelectFavoritePageModule {}
