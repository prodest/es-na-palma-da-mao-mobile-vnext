import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ChartModel } from './../../model';

@Component({
  selector: 'pie-chart',
  styles: [
    `
    pie-chart {
      display: block;
      width: 100%;
    }
  `
  ],
  templateUrl: './pie-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent {
  @Input() data: ChartModel;
}
