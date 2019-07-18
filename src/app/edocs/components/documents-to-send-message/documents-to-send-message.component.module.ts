import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSendMessageComponent } from './documents-to-send-message.component';
import { DocumentsToSendHeaderComponentModule } from '../documents-to-send-header/documents-to-send-header.component.module';
import { DocumentsToSendFooterComponentModule } from '../documents-to-send-footer/documents-to-send-footer.component.module';

@NgModule({
  declarations: [DocumentsToSendMessageComponent],
  imports: [
    DocumentsToSendHeaderComponentModule,
    DocumentsToSendFooterComponentModule,
    IonicPageModule.forChild(DocumentsToSendMessageComponent)
  ],
  exports: [DocumentsToSendMessageComponent],
})
export class DocumentsToSendMessageComponentModule {}
