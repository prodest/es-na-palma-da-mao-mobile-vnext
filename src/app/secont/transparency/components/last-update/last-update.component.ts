import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'last-update',
  templateUrl: './last-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LastUpdateComponent {
  @Input() date;
}
