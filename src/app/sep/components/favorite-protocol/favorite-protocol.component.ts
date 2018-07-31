import { Component, Input } from '@angular/core';
import { FavoriteProtocol } from '../../model';

@Component({
  selector: 'favorite-protocol',
  templateUrl: './favorite-protocol.component.html'
})
export class FavoriteProtocolComponent {
  @Input() protocol: FavoriteProtocol;

  constructor() {}
}
