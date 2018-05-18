import { Component, Input } from '@angular/core';
import { FavoriteProtocol } from './../../model';

/**
 * Generated class for the FavoriteProtocolsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'favorite-protocol',
  templateUrl: 'favorite-protocol.component.html'
})
export class FavoriteProtocolComponent {
  @Input() public favoriteProtocol: FavoriteProtocol;

  constructor() {
    console.log('Hello FavoriteProtocolComponent Component');
  }
}
