import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarFilterPage } from './calendar-filter';


import { ModulePageComponentModule, LargeButtonComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [CalendarFilterPage],
  imports: [IonicPageModule.forChild(CalendarFilterPage),
    ModulePageComponentModule,
    LargeButtonComponentModule ]
})
export class CalendarFilterPageModule {}
