import { AbstractControl } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function hour( control: AbstractControl ): { [ key: string ]: boolean } {
    if ( !control.value ) {
        return null
    }

    let HOUR_REGEXP = /^([01][0-9]|2[0-3]):[0-5][0-9]$/

    return HOUR_REGEXP.test( control.value ) ? null : { hour: true }
}
