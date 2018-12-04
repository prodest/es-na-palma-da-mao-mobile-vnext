import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PinsComponent } from './pins.component';
import { UniqueByPipeModule } from '@espm/shared/pipes';

@NgModule({
  declarations: [PinsComponent],
  imports: [CommonModule, IonicModule, UniqueByPipeModule],
  exports: [PinsComponent]
})
export class PinsComponentModule {}
