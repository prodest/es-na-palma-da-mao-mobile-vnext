import { NgModule } from '@angular/core';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { DocumentHeaderComponent } from './document-summary-header.component';

@NgModule({
  declarations: [DocumentHeaderComponent],
  imports: [IonicPageModule, CapitalizePipeModule],
  exports: [DocumentHeaderComponent]
})
export class DocumentHeaderComponentModule {}
