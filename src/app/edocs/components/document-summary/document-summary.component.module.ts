import { NgModule } from '@angular/core';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { DocumentHeaderComponentModule } from '../document-summary-header/document-summary-header.component.module';
import { DocumentInfoComponentModule } from '../document-summary-info/document-summary-info.component.module';
import { DocumentSummaryComponent } from './document-summary.component';

@NgModule({
  declarations: [DocumentSummaryComponent],
  imports: [IonicPageModule, DocumentHeaderComponentModule, DocumentInfoComponentModule, CapitalizePipeModule],
  exports: [DocumentSummaryComponent]
})
export class DocumentSummaryComponentModule {}
