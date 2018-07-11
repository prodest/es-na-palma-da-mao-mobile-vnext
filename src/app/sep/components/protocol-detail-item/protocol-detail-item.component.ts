import { Component, Input } from '@angular/core';

@Component({
  selector: 'protocol-detail-item',
  templateUrl: 'protocol-detail-item.component.html'
})
export class ProtocolDetailItemComponent {
  @Input() secondaryColor: boolean = false;
  @Input() title: string;
  @Input() value: any;

  /**
   *
   */
  constructor() {
    console.log('Hello ProtocolDetailItemComponent Component');
  }
}
