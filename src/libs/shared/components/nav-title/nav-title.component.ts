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
    if (title && title.length > 17) {
      return title.substring(0, 17)+"…";
    }else{
      return title;
    }
  }
}
