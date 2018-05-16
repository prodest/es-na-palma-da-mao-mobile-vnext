import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProtocolDetailsComponent } from './protocol-details.component';
@NgModule({
  declarations: [ProtocolDetailsComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProtocolDetailsComponent]
})
export class ComponentsModule {}
