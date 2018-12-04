import { AbstractControl } from '@angular/forms';

/**
 * Faz a validação de E-mail
 */
export const email = (control: AbstractControl): { [key: string]: boolean } => {
  if (!control.value) {
    return null;
  }

  let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return EMAIL_REGEXP.test(control.value) ? null : { email: true };
};
