import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { PdfPreviewComponent } from './pdf-preview.component';

@NgModule({
  declarations: [PdfPreviewComponent],
  imports: [IonicPageModule, PdfViewerModule],
  exports: [PdfPreviewComponent]
})
export class PdfPreviewComponentModule {}
