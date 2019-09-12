import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BusLinesPage } from './bus-lines';

import { ModulePageComponentModule } from '@espm/shared/components';

@NgModule({
  declarations: [BusLinesPage],
  imports: [ModulePageComponentModule, IonicPageModule.forChild(BusLinesPage)]
})
export class BusLinesPageModule {}
