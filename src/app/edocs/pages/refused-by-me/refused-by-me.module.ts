import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DocumentSummaryListComponentModule } from '../../components/document-summary-list';
import { RefusedByMePage } from './refused-by-me';

@NgModule({
  declarations: [RefusedByMePage],
  imports: [DocumentSummaryListComponentModule, IonicPageModule.forChild(RefusedByMePage)]
})
export class RefusedByMePageModule {}
