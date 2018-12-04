import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

import { PieChartComponent } from './pie-chart.component';

@NgModule({
  imports: [IonicPageModule, ChartsModule],
  declarations: [PieChartComponent],
  exports: [PieChartComponent]
})
export class PieChartComponentModule {}
