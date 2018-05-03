import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BusStop } from './../../model/bus-stop';

@Component({
  selector: 'stop-summary',
  templateUrl: './stop-summary.component.html'
})
export class StopSummaryComponent {
  @Input() stop: BusStop;
  @Output() select = new EventEmitter();
  @Output() close = new EventEmitter();
}
