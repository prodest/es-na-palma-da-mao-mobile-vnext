import { NgModule } from '@angular/core';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { DocumentSummaryComponentModule } from '../../components/document-summary';
import { WaitingForMySignaturePage } from './waiting-for-my-signature';

@NgModule({
  declarations: [WaitingForMySignaturePage],
  imports: [CapitalizePipeModule, DocumentSummaryComponentModule, IonicPageModule.forChild(WaitingForMySignaturePage)]
})
export class WaitingForMySignaturePageModule {}
