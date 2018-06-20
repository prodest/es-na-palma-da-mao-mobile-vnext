import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { EventItem } from '../../model';

@Component({
  selector: 'pins',
  templateUrl: './pins.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class PinsComponent {
  @Input() events: EventItem[] = [];

  constructor() {}
}
