import { Component, Input } from '@angular/core';

/**
 * Generated class for the LargeHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'large-header',
  templateUrl: 'large-header.component.html'
})
export class LargeHeaderComponent {
  /**
   * Input do texto pra ser exibido. Cada linha deve ser uma string no array.
   */
  @Input() content: Array<string>;

  constructor() {}
}
