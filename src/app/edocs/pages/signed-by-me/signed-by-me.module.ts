import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DocumentSummaryListComponentModule } from '../../components/document-summary-list';
import { SignedByMePage } from './signed-by-me';

@NgModule({
  declarations: [SignedByMePage],
  imports: [DocumentSummaryListComponentModule, IonicPageModule.forChild(SignedByMePage)]
})
export class SignedByMePageModule {}
