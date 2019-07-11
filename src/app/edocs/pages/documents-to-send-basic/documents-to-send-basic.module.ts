import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidationMessageModule } from '@espm/shared';
import { DocumentsToSendBasicPage } from './documents-to-send-basic';
import { DocumentsToSendHeaderComponentModule } from '../../components/documents-to-send-header/documents-to-send-header.component.module';
import { DocumentsToSendFooterComponentModule } from '../../components/documents-to-send-footer/documents-to-send-footer.component.module';

@NgModule({
  declarations: [DocumentsToSendBasicPage],
  imports: [
    DocumentsToSendHeaderComponentModule,
    DocumentsToSendFooterComponentModule,
    IonicPageModule.forChild(DocumentsToSendBasicPage),
    ValidationMessageModule
  ],
})
export class ForwardBasicPageModule {}
