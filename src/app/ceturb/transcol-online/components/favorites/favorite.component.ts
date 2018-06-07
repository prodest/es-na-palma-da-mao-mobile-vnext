import { Component, Input } from '@angular/core';

import { BusStop } from './../../model/bus-stop';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html'
})
export class FavoriteComponent {
  @Input() favorite: BusStop;
}
