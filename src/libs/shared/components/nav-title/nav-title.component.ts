import { Component, Input } from '@angular/core';

@Component({
  selector: 'nav-title',
  templateUrl: 'nav-title.component.html'
})
export class NavTitleComponent {
  /**
   * Input do componente
   */
  @Input() title: string;

  constructor() {}
}
