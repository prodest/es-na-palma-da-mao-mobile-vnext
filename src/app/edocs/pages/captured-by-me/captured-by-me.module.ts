import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DocumentSummaryListComponentModule } from '../../components/document-summary-list';
import { CapturedByMePage } from './captured-by-me';

@NgModule({
  declarations: [CapturedByMePage],
  imports: [DocumentSummaryListComponentModule, IonicPageModule.forChild(CapturedByMePage)]
})
export class CapturedByMePageModule {}
