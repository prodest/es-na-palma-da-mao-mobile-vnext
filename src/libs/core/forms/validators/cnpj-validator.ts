import { AbstractControl } from '@angular/forms';
import cpf_cnpj from 'cpf_cnpj';

/**
 * Faz a validação de CNPJ
 */
export const cnpj = (control: AbstractControl): { [key: string]: boolean } => {
  if (!control.value) {
    return null;
  }
  return cpf_cnpj.CNPJ.isValid(control.value) ? null : { cnpj: true };
};
