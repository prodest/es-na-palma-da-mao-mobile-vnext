import { Component, Input } from '@angular/core';

import { Prevision } from './../../model/prevision';

@Component({
  selector: 'route-previsions',
  templateUrl: './route-previsions.component.html'
})
export class RoutePrevisionsComponent {
  @Input() previsions: Prevision[];
}
