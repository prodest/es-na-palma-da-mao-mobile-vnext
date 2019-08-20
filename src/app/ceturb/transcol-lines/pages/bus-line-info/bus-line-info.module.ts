import { NgModule } from '@angular/core';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { HourComponentModule } from '../../components';
import { CeturbPipesModule } from './../../pipes';
import { BusLineInfoPage } from './bus-line-info';

import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [BusLineInfoPage],
  imports: [ModulePageComponentModule, CeturbPipesModule, CapitalizePipeModule, HourComponentModule, IonicPageModule.forChild(BusLineInfoPage)]
})
export class BusLineInfoPageModule {}
