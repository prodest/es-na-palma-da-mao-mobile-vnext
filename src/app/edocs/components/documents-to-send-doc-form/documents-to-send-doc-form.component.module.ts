import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidationMessageModule } from '@espm/shared';
import { DocumentsToSendBasicFormComponent } from './documents-to-send-doc-form.component';

@NgModule({
  declarations: [DocumentsToSendBasicFormComponent],
  imports: [
    IonicPageModule,
    ValidationMessageModule
  ],
  exports: [DocumentsToSendBasicFormComponent],
  providers: [],
})
export class DocumentsToSendBasicFormComponentModule {}
