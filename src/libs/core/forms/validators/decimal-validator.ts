import { AbstractControl } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function decimal(control: AbstractControl): { [key: string]: boolean } {
  if (!control.value) {
    return null
  }

  let DECIMAL_REGEXP = /^(\d+\.?\d{0,9}|\.\d{1,9})$/

  return DECIMAL_REGEXP.test(control.value) ? null : { decimal: true }
}
