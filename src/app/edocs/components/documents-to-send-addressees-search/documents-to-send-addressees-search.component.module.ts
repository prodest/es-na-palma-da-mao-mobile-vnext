import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModulePageComponentModule } from '@espm/shared/components';
import { DocumentsToSendAddresseesSearchComponent } from './documents-to-send-addressees-search.component';

@NgModule({
  declarations: [DocumentsToSendAddresseesSearchComponent],
  imports: [
    ModulePageComponentModule,
    IonicPageModule,
    IonicPageModule.forChild(DocumentsToSendAddresseesSearchComponent)
  ],
  exports: [DocumentsToSendAddresseesSearchComponent],
  providers: []
})
export class DocumentsToSendAddreessesSearchComponentModule { }
