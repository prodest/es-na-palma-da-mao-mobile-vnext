import { Component } from '@angular/core';

/**
 * Generated class for the ProtocolDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'protocol-details',
  templateUrl: 'protocol-details.html'
})
export class ProtocolDetailsComponent {
  text: string;

  constructor() {
    console.log('Hello ProtocolDetailsComponent Component');
    this.text = 'Hello World';
  }
}
