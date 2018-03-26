import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Ticket } from './../../model';

@Component({
  selector: 'espm-tickets',
  templateUrl: 'tickets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsComponent {
  @Input() tickets: Ticket[];
}
