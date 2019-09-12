import { NgModule } from '@angular/core';
import { NgSubscribeDirectiveModule } from '@espm/shared/directives';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { DocumentSummaryComponentModule } from '../document-summary';
import { DocumentSummaryListComponent } from './document-summary-list.component';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [DocumentSummaryListComponent],
  imports: [ ModulePageComponentModule, IonicPageModule, NgSubscribeDirectiveModule, CapitalizePipeModule, DocumentSummaryComponentModule],
  exports: [DocumentSummaryListComponent]
})
export class DocumentSummaryListComponentModule {}
