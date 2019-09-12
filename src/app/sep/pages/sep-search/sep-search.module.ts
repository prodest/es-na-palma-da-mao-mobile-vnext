import { NgModule } from '@angular/core';
import { ModulePageComponentModule, RemarkModule } from '@espm/shared/components';
import { IonicPageModule } from 'ionic-angular';

import { FavoriteProtocolModule } from '../../components';
import { SepSearchPage } from './sep-search';

@NgModule({
  declarations: [SepSearchPage],
  imports: [
    ModulePageComponentModule,
    RemarkModule,
    FavoriteProtocolModule,
    IonicPageModule.forChild(SepSearchPage)
  ]
})
export class SepSearchPageModule {}
