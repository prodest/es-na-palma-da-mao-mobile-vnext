import { Component } from '@angular/core';

/**
 * Generated class for the FavoriteProtocolsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'favorite-protocols',
  templateUrl: 'favorite-protocols.html'
})
export class FavoriteProtocolsComponent {
  text: string;

  constructor() {
    console.log('Hello FavoriteProtocolsComponent Component');
    this.text = 'Hello World';
  }
}
