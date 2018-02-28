import { AbstractControl } from '@angular/forms'
import cpf_cnpj from 'cpf_cnpj'

/**
 * Faz a validação de CPF
 */
export const cpf = ( control: AbstractControl ): { [ key: string ]: boolean } => {
    if ( !control.value ) {
        return null
    }

    return cpf_cnpj.CPF.isValid( control.value ) ? null : { cpf: true }
}
