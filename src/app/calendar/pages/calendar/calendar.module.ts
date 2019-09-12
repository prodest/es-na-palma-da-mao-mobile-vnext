import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import { CalendarFilterPageModule } from '../calendar-filter/calendar-filter.module';
import { NgCalendarModule } from 'ionic2-calendar';
import { DayComponentModule, EventComponentModule } from '../../components';


import { NavTitleComponentModule, MainFooterBarComponentModule, ModuleIndexComponentModule, ModulePageComponentModule} from '@espm/shared/components';

@NgModule({
  declarations: [CalendarPage],
  imports: [
    IonicPageModule.forChild(CalendarPage),
    NavTitleComponentModule,
    ModulePageComponentModule,
    ModuleIndexComponentModule,
    MainFooterBarComponentModule,
    CalendarFilterPageModule,
    NgCalendarModule,
    DayComponentModule,
    EventComponentModule
  ]
})
export class CalendarPageModule {}
