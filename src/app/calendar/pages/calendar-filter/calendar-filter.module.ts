import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarFilterPage } from './calendar-filter';

@NgModule({
  declarations: [CalendarFilterPage],
  imports: [IonicPageModule.forChild(CalendarFilterPage)]
})
export class CalendarFilterPageModule {}
