import { Component } from '@angular/core';

/**
 * Generated class for the FavoriteProtocolsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'favorite-protocol',
  templateUrl: 'favorite-protocol.html'
})
export class FavoriteProtocolComponent {
  text: string;

  constructor() {
    console.log('Hello FavoriteProtocolComponent Component');
    this.text = 'Hello World';
  }
}
