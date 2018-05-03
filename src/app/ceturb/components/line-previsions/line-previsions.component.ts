import { Component, Input } from '@angular/core';

import { BusLine } from './../../model/bus-line';
import { Prevision } from './../../model/prevision';

@Component({
  selector: 'line-previsions',
  templateUrl: './line-previsions.component.html'
})
export class LinePrevisionsComponent {
  @Input() line: BusLine;
  @Input() previsions: Prevision[];
}
