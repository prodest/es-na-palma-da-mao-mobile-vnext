import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSendAddresseesPage } from './documents-to-send-addressees';
import { DocumentsToSendHeaderComponentModule } from '../../components/documents-to-send-header/documents-to-send-header.component.module';
import { DocumentsToSendFooterComponentModule } from '../../components/documents-to-send-footer/documents-to-send-footer.component.module';

@NgModule({
  declarations: [DocumentsToSendAddresseesPage],
  imports: [
    DocumentsToSendHeaderComponentModule,
    DocumentsToSendFooterComponentModule,
    IonicPageModule.forChild(DocumentsToSendAddresseesPage),
  ],
})
export class DocumentsToSendAddresseesPageModule {}