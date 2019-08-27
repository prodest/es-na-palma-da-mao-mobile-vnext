import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentsToSignPage } from './documents-to-sign';
import { ModuleIndexComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [DocumentsToSignPage],
  imports: [IonicPageModule.forChild(DocumentsToSignPage), ModuleIndexComponentModule]
})
export class DocumentsToSignPageModule {}
