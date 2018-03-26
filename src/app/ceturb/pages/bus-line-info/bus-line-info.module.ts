import { NgModule } from '@angular/core';
import { CapitalizePipeModule } from '@espm/shared/pipes';
import { IonicPageModule } from 'ionic-angular';

import { HourComponentModule } from '../../components';
import { CeturbPipesModule } from './../../pipes';
import { BusLineInfoPage } from './bus-line-info';

@NgModule({
  declarations: [BusLineInfoPage],
  imports: [CeturbPipesModule, CapitalizePipeModule, HourComponentModule, IonicPageModule.forChild(BusLineInfoPage)]
})
export class BusLineInfoPageModule {}
