import { Component, Input } from '@angular/core';

/**
 * Generated class for the ProtocolDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'protocol-detail-item',
  templateUrl: 'protocol-detail-item.component.html'
})
export class ProtocolDetailItemComponent {
  @Input() public secondaryColor: boolean = false;
  @Input() public title: string;
  @Input() public value: any;

  constructor() {
    console.log('Hello ProtocolDetailItemComponent Component');
  }
}
