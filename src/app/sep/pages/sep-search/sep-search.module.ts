import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SepSearchPage } from './sep-search';
import { FavoriteProtocolComponentModule } from './../../components';
import { RemarkModule } from '@espm/shared/components';
@NgModule({
  declarations: [SepSearchPage],
  imports: [RemarkModule, FavoriteProtocolComponentModule, IonicPageModule.forChild(SepSearchPage)]
})
export class SepSearchPageModule {}
