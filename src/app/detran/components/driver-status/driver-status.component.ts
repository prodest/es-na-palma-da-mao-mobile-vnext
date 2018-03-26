import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'espm-driver-status',
  templateUrl: 'driver-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverStatusComponent {
  @Input()
  status: {
    expirationDate: string;
    renew: boolean;
    ok: boolean;
    blocked: boolean;
    expired: boolean;
    blockMotive: string;
  };

  /**
   *
   */
  getStatusClass = cnh => {
    return {
      'status--ok': cnh.ok,
      'status--blocked': cnh.blocked,
      'status--expired': cnh.expired,
      'status--renew': cnh.renew
    };
  };
}
