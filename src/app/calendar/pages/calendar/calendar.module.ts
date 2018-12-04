import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import { CalendarFilterPageModule } from '../calendar-filter/calendar-filter.module';
import { NgCalendarModule } from 'ionic2-calendar';
import { DayComponentModule, EventComponentModule } from '../../components';

@NgModule({
  declarations: [CalendarPage],
  imports: [
    IonicPageModule.forChild(CalendarPage),
    CalendarFilterPageModule,
    NgCalendarModule,
    DayComponentModule,
    EventComponentModule
  ]
})
export class CalendarPageModule {}
