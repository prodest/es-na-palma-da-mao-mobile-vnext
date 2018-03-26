import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BusLinesPage } from './bus-lines';

@NgModule({
  declarations: [BusLinesPage],
  imports: [IonicPageModule.forChild(BusLinesPage)]
})
export class BusLinesPageModule {}
