import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'espm-geolocation-status',
  templateUrl: 'geolocation-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeolocationStatusComponent {
  @Input() searching = true;
  @Output() search = new EventEmitter();
}
