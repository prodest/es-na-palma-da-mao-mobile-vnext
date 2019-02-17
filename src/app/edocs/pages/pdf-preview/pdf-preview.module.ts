import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PdfPreviewComponentModule } from '../../components/pdf-preview/pdf-preview.component.module';
import { PdfPreviewPage } from './pdf-preview';

@NgModule({
  declarations: [PdfPreviewPage],
  imports: [IonicPageModule, PdfPreviewComponentModule, IonicPageModule.forChild(PdfPreviewPage)]
})
export class PdfPreviewPageModule {}
