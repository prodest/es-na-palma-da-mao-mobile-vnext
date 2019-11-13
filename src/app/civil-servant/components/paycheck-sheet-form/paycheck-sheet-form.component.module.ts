import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { ValidationMessageModule } from '@espm/shared';
import { PaycheckSheetFormComponent } from './paycheck-sheet-form.component'

@NgModule({
  declarations: [PaycheckSheetFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    ValidationMessageModule
  ],
  exports: [PaycheckSheetFormComponent],
  providers: [],
})
export class PaycheckSheetFormModule { }
