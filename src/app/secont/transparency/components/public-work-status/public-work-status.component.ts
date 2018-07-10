import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PublicWorkStatus } from '../../model';

@Component({
  selector: 'public-work-status',
  templateUrl: './public-work-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicWorkStatusComponent {
  PublicWorkStatus = PublicWorkStatus;
  @Input() status: PublicWorkStatus;
}
