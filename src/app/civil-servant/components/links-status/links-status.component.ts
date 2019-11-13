import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'links-status',
  templateUrl: './links-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinksStatusComponent {
  @Input() status;
}
