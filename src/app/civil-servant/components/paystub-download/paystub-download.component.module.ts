import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystubDownloadComponent } from './paystub-download.component';
import { ModulePageComponentModule } from '@espm/shared';
import { PaycheckPayrollFormModule } from '../paycheck-payroll-form'

@NgModule({
  declarations: [
    PaystubDownloadComponent,
  ],
  imports: [
    ModulePageComponentModule,
    PaycheckPayrollFormModule,
    IonicPageModule,
  ],
  exports: [
    PaystubDownloadComponent,
  ]
})
export class PaystubDownloadComponentModule { }
