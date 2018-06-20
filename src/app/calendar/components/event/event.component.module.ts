import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EventComponent } from './event.component';

@NgModule({
  declarations: [EventComponent],
  imports: [CommonModule, IonicModule],
  exports: [EventComponent]
})
export class EventComponentModule {}
