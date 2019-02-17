import { NgModule } from '@angular/core';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { DocumentInfoComponent } from './document-summary-info.component';

@NgModule({
  declarations: [DocumentInfoComponent],
  imports: [IonicPageModule, CapitalizePipeModule],
  exports: [DocumentInfoComponent]
})
export class DocumentInfoComponentModule {}
