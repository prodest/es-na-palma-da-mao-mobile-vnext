import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSendPage } from './documents-to-send';
import { DocumentsToSendHeaderComponentModule } from '../../components/documents-to-send-header/documents-to-send-header.component.module';
import { DocumentsToSendFooterComponentModule } from '../../components/documents-to-send-footer/documents-to-send-footer.component.module';
import {
  DocumentsToSendAddresseesComponentModule,
  DocumentsToSendBasicComponentModule,
  DocumentsToSendDocComponentModule,
  DocumentsToSendMessageComponentModule,
  
} from '../../components';

@NgModule({
  declarations: [DocumentsToSendPage],
  imports: [
    DocumentsToSendHeaderComponentModule,
    DocumentsToSendFooterComponentModule,
    DocumentsToSendAddresseesComponentModule,
    DocumentsToSendBasicComponentModule,
    DocumentsToSendDocComponentModule,
    DocumentsToSendMessageComponentModule,
    IonicPageModule.forChild(DocumentsToSendPage)
  ]
})
export class DocumentsToSendPageModule {}
