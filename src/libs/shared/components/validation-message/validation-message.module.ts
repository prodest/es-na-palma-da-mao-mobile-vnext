import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'

import { ValidationMessageComponent } from './validation-message.component'

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ValidationMessageComponent],
  exports: [ValidationMessageComponent]
})
export class ValidationMessageModule {}
