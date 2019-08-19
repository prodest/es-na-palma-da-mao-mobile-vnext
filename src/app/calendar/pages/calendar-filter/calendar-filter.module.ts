import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarFilterPage } from './calendar-filter';


import { MainFooterBarComponentModule, NavTitleComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [CalendarFilterPage],
  imports: [IonicPageModule.forChild(CalendarFilterPage),
    NavTitleComponentModule,
    MainFooterBarComponentModule ]
})
export class CalendarFilterPageModule {}
