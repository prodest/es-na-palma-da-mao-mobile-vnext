import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSendAddAddresseesPage } from './documents-to-send-add-addressees';
import { DocumentsToSendHeaderComponentModule } from '../../components/documents-to-send-header/documents-to-send-header.component.module';
import { DocumentsToSendAddreessesSearchComponentModule } from '../../components/documents-to-send-addressees-search';

@NgModule({
  declarations: [DocumentsToSendAddAddresseesPage],
  imports: [
    DocumentsToSendHeaderComponentModule,
    DocumentsToSendAddreessesSearchComponentModule,
    IonicPageModule.forChild(DocumentsToSendAddAddresseesPage),
  ],
  exports: [DocumentsToSendAddAddresseesPage],
})
export class DocumentsToSendAddAddresseesPageModule {}