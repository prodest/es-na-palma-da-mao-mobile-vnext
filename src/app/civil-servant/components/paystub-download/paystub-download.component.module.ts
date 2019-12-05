import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubDownloadComponent } from './paystub-download.component';
import { ModulePageComponentModule } from '@espm/shared';
import { PaycheckSheetComponentModule } from '../paycheck-sheet'

@NgModule({
  declarations: [
    PaystubDownloadComponent,
  ],
  imports: [
    ModulePageComponentModule,
    PaycheckSheetComponentModule,
    IonicPageModule,
  ],
  exports: [
    PaystubDownloadComponent,
  ]
})
export class PaystubDownloadComponentModule { }
