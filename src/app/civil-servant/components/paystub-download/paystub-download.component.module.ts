import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubDownloadComponent } from './paystub-download.component';
import { ModulePageComponentModule } from '@espm/shared';
import { PaycheckSheetFormModule } from '../paycheck-sheet-form'

@NgModule({
  declarations: [
    PaystubDownloadComponent,
  ],
  imports: [
    ModulePageComponentModule,
    PaycheckSheetFormModule,
    IonicPageModule,
  ],
  exports: [
    PaystubDownloadComponent,
  ]
})
export class PaystubDownloadComponentModule { }
