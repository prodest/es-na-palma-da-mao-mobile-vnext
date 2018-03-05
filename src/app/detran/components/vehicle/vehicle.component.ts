import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { Vehicle } from './../../model'

@Component({
  selector: 'espm-vehicle',
  templateUrl: 'vehicle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleComponent {
  @Input() vehicle: Vehicle
}
