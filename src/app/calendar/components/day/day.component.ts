import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { EventItem } from '../../model';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DayComponent {
  @Input() public events: EventItem[];
  @Input() public label: string;
}
