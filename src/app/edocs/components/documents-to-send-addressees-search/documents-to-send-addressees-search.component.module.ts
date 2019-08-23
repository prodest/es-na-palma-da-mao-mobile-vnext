import { NgModule } from '@angular/core';
import { DocumentsToSendAddresseesSearchComponent } from './documents-to-send-addressees-search.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [DocumentsToSendAddresseesSearchComponent],
  imports: [IonicPageModule, IonicPageModule.forChild(DocumentsToSendAddresseesSearchComponent)],
  exports: [DocumentsToSendAddresseesSearchComponent],
  providers: []
})
export class DocumentsToSendAddreessesSearchComponentModule {}
