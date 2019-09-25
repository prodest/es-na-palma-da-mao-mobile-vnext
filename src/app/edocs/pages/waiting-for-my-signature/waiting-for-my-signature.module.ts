import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DocumentSummaryListComponentModule } from '../../components/document-summary-list';
import { WaitingForMySignaturePage } from './waiting-for-my-signature';

@NgModule({
  declarations: [WaitingForMySignaturePage],
  imports: [DocumentSummaryListComponentModule, IonicPageModule.forChild(WaitingForMySignaturePage)]
})
export class WaitingForMySignaturePageModule { }
