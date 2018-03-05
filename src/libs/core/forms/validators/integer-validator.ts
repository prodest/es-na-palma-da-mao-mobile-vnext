import { AbstractControl } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function integer(control: AbstractControl): { [key: string]: boolean } {
  if (!control.value) {
    return null
  }

  let INTEGER_REGEXP = /^\d+$/

  return INTEGER_REGEXP.test(control.value) ? null : { integer: true }
}
