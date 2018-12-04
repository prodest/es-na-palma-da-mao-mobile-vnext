import { NgModule } from '@angular/core';
import { ExpandableHeaderModule } from '@espm/shared';
import { HighlightModule, RemarkModule } from '@espm/shared/components';
import { IonicPageModule } from 'ionic-angular';

import { SearchHitItemComponentModule } from './../../components';
import { DioSearchPage } from './dio-search';

@NgModule({
  declarations: [DioSearchPage],
  imports: [
    RemarkModule,
    HighlightModule,
    SearchHitItemComponentModule,
    ExpandableHeaderModule,
    IonicPageModule.forChild(DioSearchPage)
  ]
})
export class DioSearchPageModule {}
