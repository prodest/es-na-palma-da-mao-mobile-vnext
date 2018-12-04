import { Directive, Input, TemplateRef } from '@angular/core';

// @Component({
//     selector: 'espm-header',
//     template: '<ng-content></ng-content>'
// })
// export class Header {}

// @Component({
//     selector: 'espm-footer',
//     template: '<ng-content></ng-content>'
// })
// export class Footer {}

@Directive({
  selector: '[espmTemplate]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {}
})
export class EspmTemplateDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('espmTemplate') name: string;
  @Input() type: string;

  /**
   *
   */
  constructor(public template: TemplateRef<any>) {}

  /**
   *
   */
  getType(): string {
    return this.name;
  }
}
