import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSendAddAddresseesPage } from './documents-to-send-add-addressees';
import { DocumentsToSendHeaderComponentModule } from '../../components/documents-to-send-header/documents-to-send-header.component.module';

@NgModule({
  declarations: [DocumentsToSendAddAddresseesPage],
  imports: [
    DocumentsToSendHeaderComponentModule,
    IonicPageModule.forChild(DocumentsToSendAddAddresseesPage),
  ],
})
export class DocumentsToSendAddAddresseesPageModule {}