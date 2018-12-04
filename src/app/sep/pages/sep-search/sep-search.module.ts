import { NgModule } from '@angular/core';
import { RemarkModule } from '@espm/shared/components';
import { IonicPageModule } from 'ionic-angular';

import { FavoriteProtocolModule } from '../../components';
import { SepSearchPage } from './sep-search';

@NgModule({
  declarations: [SepSearchPage],
  imports: [RemarkModule, FavoriteProtocolModule, IonicPageModule.forChild(SepSearchPage)]
})
export class SepSearchPageModule {}
