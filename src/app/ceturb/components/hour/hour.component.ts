import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'espm-hour',
  templateUrl: 'hour.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourComponent {
  @Input() hour: string;
}
