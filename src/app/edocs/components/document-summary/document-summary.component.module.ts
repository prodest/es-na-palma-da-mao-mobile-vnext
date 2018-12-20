import { NgModule } from '@angular/core';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { DocumentSummaryComponent } from './document-summary.component';

@NgModule({
  declarations: [DocumentSummaryComponent],
  imports: [IonicPageModule, CapitalizePipeModule],
  exports: [DocumentSummaryComponent]
})
export class DocumentSummaryComponentModule {}
