import { Component, Input } from '@angular/core';

/**
 * Generated class for the LargeHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'large-button',
  templateUrl: 'large-button.component.html'
})
export class LargeButtonComponent {
  /**
   * Input do texto pra ser exibido. Cada linha deve ser uma string no array.
   */
  @Input() leftIcon: string;
  @Input() rightIcon: string;
  @Input() text: string;
  @Input() color: string;
  
  constructor() {}
}
