import { AbstractControl } from '@angular/forms'

import { integer } from './integer-validator'

/** A hero's name can't match the given regular expression */
export function year(control: AbstractControl): { [key: string]: boolean } {
  if (!control.value) {
    return null
  }

  const integerValidation = integer(control)
  if (integerValidation) {
    return { year: true }
  }

  const year = +control.value
  const isValidYear = 1900 < year && year <= new Date().getFullYear() + 1

  return isValidYear ? null : { year: true }
}
