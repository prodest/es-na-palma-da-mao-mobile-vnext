import { AbstractControl } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function phone(control: AbstractControl) {
  if (!control.value) {
    return null
  }

  let PHONE_REGEXP = /^\(\d{2}\)\s{1}\d{4}-\d{4}$/

  return PHONE_REGEXP.test(control.value) ? null : { phone: true }
}
