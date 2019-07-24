import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSendAddresseesComponent } from './documents-to-send-addressees.component';
import { DocumentsToSendHeaderComponentModule } from '../documents-to-send-header/documents-to-send-header.component.module';
import { DocumentsToSendFooterComponentModule } from '../documents-to-send-footer/documents-to-send-footer.component.module';
import { DocumentsToSendAddreessesFormModule } from '../documents-to-send-addressees-form/documents-to-send-addressees-form.component.module';

@NgModule({
  declarations: [DocumentsToSendAddresseesComponent],
  imports: [
    DocumentsToSendHeaderComponentModule,
    DocumentsToSendFooterComponentModule,
    DocumentsToSendAddreessesFormModule,
    IonicPageModule.forChild(DocumentsToSendAddresseesComponent),
  ],
  exports: [DocumentsToSendAddresseesComponent],
})
export class DocumentsToSendAddresseesComponentModule {}
