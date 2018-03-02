import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { DriverStatus } from './../../model'

@Component( {
    selector: 'espm-driver-status',
    templateUrl: 'driver-status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
} )
export class DriverStatusComponent {
    @Input() status: DriverStatus

    /**
     *
     */
    getStatusClass = cnh => {
        return {
            'status--ok': cnh.ok,
            'status--blocked': cnh.blocked,
            'status--expired': cnh.expired,
            'status--renew': cnh.renew
        }
    }
}
