import { Component, Input } from '@angular/core';

import { Prevision } from './../../model/prevision';

@Component({
  selector: 'line-previsions',
  templateUrl: './line-previsions.component.html'
})
export class LinePrevisionsComponent {
  @Input() line: string;
  @Input() previsions: Prevision[];
}
