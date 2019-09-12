import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSendAddAddresseesComponent } from './documents-to-send-add-addressees.component';
import { DocumentsToSendHeaderComponentModule } from '../documents-to-send-header/documents-to-send-header.component.module';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [DocumentsToSendAddAddresseesComponent],
  imports: [
    ModulePageComponentModule,
    DocumentsToSendHeaderComponentModule,
    IonicPageModule.forChild(DocumentsToSendAddAddresseesComponent),
  ],
  exports: [DocumentsToSendAddAddresseesComponent],
})
export class DocumentsToSendAddAddresseesComponentModule {}