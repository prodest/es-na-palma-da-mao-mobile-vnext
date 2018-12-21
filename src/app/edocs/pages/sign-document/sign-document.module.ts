import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SignDocumentPage } from './sign-document';

@NgModule({
  declarations: [SignDocumentPage],
  imports: [IonicPageModule, IonicPageModule.forChild(SignDocumentPage)]
})
export class SignDocumentPageModule {}
