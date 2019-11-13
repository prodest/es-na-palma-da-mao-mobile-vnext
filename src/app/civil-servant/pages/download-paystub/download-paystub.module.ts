import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DownloadPaystubPage } from './download-paystub';
import { ModulePageComponentModule } from '@espm/shared';

@NgModule({
  declarations: [
    DownloadPaystubPage,
  ],
  imports: [
    ModulePageComponentModule,
    IonicPageModule.forChild(DownloadPaystubPage),
  ],
})
export class DownloadPaystubPageModule { }
