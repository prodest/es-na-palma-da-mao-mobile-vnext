import { NgModule } from '@angular/core';
import { RemarkModule } from '@espm/shared/components';
import { IonicPageModule } from 'ionic-angular';

import { SepSearchPage } from './sep-search';

@NgModule({
  declarations: [SepSearchPage],
  imports: [RemarkModule, IonicPageModule.forChild(SepSearchPage)]
})
export class SepSearchPageModule {}
