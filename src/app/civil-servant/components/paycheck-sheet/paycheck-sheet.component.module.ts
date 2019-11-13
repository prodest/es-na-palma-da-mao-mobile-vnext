import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaycheckSheetComponent } from './paycheck-sheet.component';
import { PaycheckSheetFormModule } from '../paycheck-sheet-form'

@NgModule({
  declarations: [PaycheckSheetComponent],
  imports: [
    IonicPageModule.forChild(PaycheckSheetComponent),
    PaycheckSheetFormModule
  ],
  exports: [PaycheckSheetComponent]
})
export class PaycheckSheetComponentModule { }
