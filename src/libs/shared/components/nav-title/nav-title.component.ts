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
   limite = (title) => {
    if (this.title.length > 17){
      return this.title.substring(0, 17)+"…";
      }else{
      return this.title;
      }
  }
}
