import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ChartModel } from './../../model';

@Component({
  selector: 'bar-chart',
  styles: [
    `
    bar-chart {
      display: block;
      width: 100%;
    }
  `
  ],
  templateUrl: './bar-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent {
  @Input() data: ChartModel;
}
