import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSendDocComponent } from './documents-to-send-doc.component';
import { DocumentsToSendHeaderComponentModule } from '../documents-to-send-header/documents-to-send-header.component.module';
import { DocumentsToSendFooterComponentModule } from '../documents-to-send-footer/documents-to-send-footer.component.module';

@NgModule({
  declarations: [DocumentsToSendDocComponent],
  imports: [
    DocumentsToSendHeaderComponentModule,
    DocumentsToSendFooterComponentModule,
    IonicPageModule.forChild(DocumentsToSendDocComponent)
  ],
  exports: [DocumentsToSendDocComponent],
})
export class DocumentsToSendDocComponentModule {}
