import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import { CalendarFilterPageModule } from '../calendar-filter/calendar-filter.module';
import { NgCalendarModule } from 'ionic2-calendar';
import { UniqueByPipeModule } from '@espm/shared/pipes';

/* import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt-PT';

registerLocaleData(localePt); */

// import {} from 'intl';

@NgModule({
  declarations: [CalendarPage],
  imports: [IonicPageModule.forChild(CalendarPage), CalendarFilterPageModule, NgCalendarModule, UniqueByPipeModule]
})
export class CalendarPageModule {}
