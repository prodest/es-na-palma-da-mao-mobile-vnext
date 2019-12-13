import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ValidationMessageModule } from '@espm/shared';
import { PaycheckPayrollFormComponent } from './paycheck-payroll-form.component'

@NgModule({
  declarations: [PaycheckPayrollFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    ValidationMessageModule
  ],
  exports: [PaycheckPayrollFormComponent],
  providers: [],
})
export class PaycheckPayrollFormModule { }
