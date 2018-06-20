import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { EventItem } from '../../model';
import * as moment from 'moment';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent {
  @Input() event: EventItem;
  @Input() currentDate: Date;

  constructor() {}

  /**
   *
   *
   */
  isAllDay() {
    return (
      this.event.allDay ||
      (!this.event.sameDay &&
        this.event.startTime <
          moment(this.currentDate)
            .startOf('day')
            .toDate() &&
        this.event.endTime >
          moment(this.currentDate)
            .endOf('day')
            .toDate())
    );
  }

  /**
   *
   *
   */
  startsIn() {
    return (
      this.event.startTime >
      moment(this.currentDate)
        .startOf('day')
        .toDate()
    );
  }

  /**
   *
   *
   */
  endsIn() {
    return (
      this.event.endTime <
      moment(this.currentDate)
        .endOf('day')
        .toDate()
    );
  }
}
