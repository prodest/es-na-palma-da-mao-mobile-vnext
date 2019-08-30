import { Output, EventEmitter } from '@angular/core';
import { FormBase } from '@espm/core';

/**
 * @description Classe abstrata para ser implementada pelos componentes
 * que compõem os steps do wizard (slide)
 * @author David Vilaça
 * @date 2019-07-22
 * @export
 * @abstract
 * @class WizardStep
 * @template T objeto de saída do step ao completar
 */
export abstract class WizardStep<T> {

  @Output() onComplete = new EventEmitter<T>();
  protected abstract form: FormBase;

  submit(): void {
    this.form.onSubmitClick(this.form.form.value);
  }

  get isValid(): boolean {
    return this.form.form.valid;
  }

  protected completeStep(value: T): void {
    return this.onComplete.emit(value);
  }

}
