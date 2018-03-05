import { AbstractControl } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function plate(control: AbstractControl) {
  if (!control.value) {
    return null
  }

  let PLATE_REGEX = /^[a-zA-Z]{3}\d{4}$/

  return PLATE_REGEX.test(control.value) ? null : { plate: true }
}
