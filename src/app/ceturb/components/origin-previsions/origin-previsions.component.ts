import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BusLine } from './../../model/bus-line';
import { BusStop } from './../../model/bus-stop';
import { Prevision } from './../../model/prevision';

@Component({
  selector: 'origin-previsions',
  templateUrl: './origin-previsions.component.html'
})
export class OriginPrevisionsComponent {
  @Input() origin: BusStop;
  @Input() previsions: Prevision[];
  @Output() selectLine = new EventEmitter<BusLine>();
}
