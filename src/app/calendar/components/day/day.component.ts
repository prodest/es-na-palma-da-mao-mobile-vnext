import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { EventItem } from '../../model';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DayComponent {
  @Input() events: EventItem[];
  @Input() label: string;
}
