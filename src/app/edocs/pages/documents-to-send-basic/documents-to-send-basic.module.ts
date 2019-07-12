import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSendBasicPage } from './documents-to-send-basic';
import { DocumentsToSendHeaderComponentModule } from '../../components/documents-to-send-header/documents-to-send-header.component.module';
import { DocumentsToSendFooterComponentModule } from '../../components/documents-to-send-footer/documents-to-send-footer.component.module';
import { DocumentsToSendBasicFormModule } from '../../components'

@NgModule({
  declarations: [DocumentsToSendBasicPage],
  imports: [
    DocumentsToSendHeaderComponentModule,
    DocumentsToSendFooterComponentModule,
    DocumentsToSendBasicFormModule,
    IonicPageModule.forChild(DocumentsToSendBasicPage)
  ],
})
export class ForwardBasicPageModule {}
