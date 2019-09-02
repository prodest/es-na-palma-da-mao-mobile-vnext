import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidationMessageModule } from '@espm/shared';
import { DocumentsToSendMessageFormComponent } from './documents-to-send-message-form.component'

@NgModule({
  declarations: [DocumentsToSendMessageFormComponent],
  imports: [
    IonicPageModule,
    ValidationMessageModule
  ],
  exports: [DocumentsToSendMessageFormComponent],
  providers: [],
})
export class DocumentsToSendMessageFormModule { }
