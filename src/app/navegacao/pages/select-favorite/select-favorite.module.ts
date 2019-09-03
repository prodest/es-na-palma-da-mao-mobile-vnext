import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectFavoritePage } from './select-favorite';
import { LargeHeaderComponentModule } from '../../components/large-header';
import { LargeButtonComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [
    SelectFavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectFavoritePage),
    LargeHeaderComponentModule,
    LargeButtonComponentModule
  ]
})
export class SelectFavoritePageModule { }
