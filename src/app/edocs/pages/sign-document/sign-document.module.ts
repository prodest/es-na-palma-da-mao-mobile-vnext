import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SignDocumentPage } from './sign-document';
import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [SignDocumentPage],
  imports: [ModulePageComponentModule, IonicPageModule, IonicPageModule.forChild(SignDocumentPage)]
})
export class SignDocumentPageModule {}
