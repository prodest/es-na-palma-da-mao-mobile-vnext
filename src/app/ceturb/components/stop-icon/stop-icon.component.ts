import { Component, Input } from '@angular/core';

import { BusStop } from './../../model/bus-stop';

@Component({
  selector: 'stop-icon',
  templateUrl: './stop-icon.component.html'
})
export class StopIconComponent {
  @Input() stop: BusStop;
}
