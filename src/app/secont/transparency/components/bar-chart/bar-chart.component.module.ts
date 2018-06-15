import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

import { BarChartComponent } from './bar-chart.component';

@NgModule({
  imports: [IonicPageModule, ChartsModule],
  declarations: [BarChartComponent],
  exports: [BarChartComponent]
})
export class BarChartComponentModule {}
