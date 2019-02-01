import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DateFormatPipeModule } from '@espm/shared/pipes';

import { Home2Page } from './home2';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [Home2Page,],

  imports: [DateFormatPipeModule, IonicPageModule.forChild(Home2Page),HttpClientModule],
})
export class Home2PageModule {}
