import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModulePageComponentModule } from '@espm/shared/components';
import { DocumentsToSendHeaderComponentModule } from '../documents-to-send-header/documents-to-send-header.component.module';
import { DocumentsToSendAddAddresseesComponent } from './documents-to-send-add-addressees.component';
import { RestrictPipe } from './restrict.pipe';

@NgModule({
  declarations: [
    DocumentsToSendAddAddresseesComponent,
    RestrictPipe
  ],
  imports: [
    ModulePageComponentModule,
    DocumentsToSendHeaderComponentModule,
    IonicPageModule.forChild(DocumentsToSendAddAddresseesComponent),
  ],
  exports: [DocumentsToSendAddAddresseesComponent],
})
export class DocumentsToSendAddAddresseesComponentModule { }
