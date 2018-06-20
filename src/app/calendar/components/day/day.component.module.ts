import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DayComponent } from './day.component';
import { PinsComponentModule } from '../pins';

@NgModule({
  declarations: [DayComponent],
  imports: [CommonModule, IonicModule, PinsComponentModule],
  exports: [DayComponent]
})
export class DayComponentModule {}
