import { AbstractControl } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function zipcode( control: AbstractControl ): { [ key: string ]: boolean } {
    if ( !control.value ) {
        return null
    }

    let ZIPCODE_REGEXP = /^\d{2}\.\d{3}-\d{3}$/

    return ZIPCODE_REGEXP.test( control.value ) ? null : { zipcode: true }
}
