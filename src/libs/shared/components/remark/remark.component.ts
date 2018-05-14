import { Component } from '@angular/core';

@Component({
  selector: 'remark',
  template: '<div style="color: #999;" flex><ng-content></ng-content></div>'
})
export class RemarkComponent {
  constructor() {}
}
