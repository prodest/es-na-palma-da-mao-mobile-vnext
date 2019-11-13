import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DownloadPaystubPage } from './download-paystub';
import { ModulePageComponentModule } from '@espm/shared';
import { PaycheckSheetComponentModule } from '../../components/paycheck-sheet'

@NgModule({
  declarations: [
    DownloadPaystubPage,
  ],
  imports: [
    ModulePageComponentModule,
    PaycheckSheetComponentModule,
    IonicPageModule.forChild(DownloadPaystubPage),
  ],
})
export class DownloadPaystubPageModule { }
