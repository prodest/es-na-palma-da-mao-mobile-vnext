import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'espm-validation-message',
  templateUrl: './validation-message.component.html'
})
export class ValidationMessageComponent implements OnChanges {
  @Input() errors: string[] = [];
  @Input() showAll: boolean = false;

  /**
   *
   *
   */
  ngOnChanges() {
    const errors = this.errors || [];
    this.errors = errors.length && !this.showAll ? [errors.shift()] : errors;
  }
}
