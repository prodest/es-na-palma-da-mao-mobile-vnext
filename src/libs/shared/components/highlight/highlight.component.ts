import { Component } from '@angular/core';

@Component({
  selector: 'highlight',
  template: '<div class="msg-highlight accent" flex><ng-content></ng-content></div>'
})
export class HighlightComponent {
  constructor() {}
}
