import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSendBasicComponent } from './documents-to-send-basic.component';
import { DocumentsToSendHeaderComponentModule } from '../documents-to-send-header/documents-to-send-header.component.module';
import { DocumentsToSendFooterComponentModule } from '../documents-to-send-footer/documents-to-send-footer.component.module';
import { DocumentsToSendBasicFormModule } from '../documents-to-send-basic-form'

@NgModule({
  declarations: [DocumentsToSendBasicComponent],
  imports: [
    DocumentsToSendHeaderComponentModule,
    DocumentsToSendFooterComponentModule,
    DocumentsToSendBasicFormModule,
    IonicPageModule.forChild(DocumentsToSendBasicComponent)
  ],
  exports: [DocumentsToSendBasicComponent]
})
export class DocumentsToSendBasicComponentModule {}
