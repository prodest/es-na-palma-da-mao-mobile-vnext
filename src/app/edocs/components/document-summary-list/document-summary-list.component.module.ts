import { NgModule } from '@angular/core';
import { NgSubscribeDirectiveModule } from '@espm/shared/directives';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { DocumentSummaryComponentModule } from '../document-summary';
import { DocumentSummaryListComponent } from './document-summary-list.component';

@NgModule({
  declarations: [DocumentSummaryListComponent],
  imports: [IonicPageModule, NgSubscribeDirectiveModule, CapitalizePipeModule, DocumentSummaryComponentModule],
  exports: [DocumentSummaryListComponent]
})
export class DocumentSummaryListComponentModule {}
