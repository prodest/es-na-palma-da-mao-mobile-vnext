import { EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import merge from 'lodash-es/merge'

import {
  CELL_PHONE_MASK,
  CEP_MASK,
  CNPJ_MASK,
  CPF_MASK,
  CREDICARD_MASK,
  DATE_MASK,
  EXPIRATION_MASK,
  HOUR_MASK,
  PHONE_MASK,
  PLATE_MASK,
  YEAR_MASK
} from './masks'
import { cellphone, cnpj, cpf, date, decimal, email, hour, integer, phone, plate, year, zipcode } from './validators'

export type ValidationMessages = { [key: string]: { [key: string]: string } }
export type ValidationErrors = { [key: string]: string[] }
export type SubmitConfig = {
  showErrors?: boolean
  submitEvenIfInvalid?: boolean
}

export abstract class FormBase {
  @Output() public onSubmit = new EventEmitter<any>()
  @Output() public onCancel = new EventEmitter()

  /**
   *
   *
   */
  public validators = {
    cellphone,
    cpf,
    date,
    phone,
    cnpj,
    email,
    zipcode,
    plate,
    decimal,
    integer,
    year,
    hour
  }

  /**
   *
   *
   */
  public masks = {
    cnpj: CNPJ_MASK,
    cep: CEP_MASK,
    phone: PHONE_MASK,
    cellphone: CELL_PHONE_MASK,
    date: DATE_MASK,
    credicard: CREDICARD_MASK,
    year: YEAR_MASK,
    plate: PLATE_MASK,
    cpf: CPF_MASK,
    expirationDate: EXPIRATION_MASK,
    hour: HOUR_MASK
  }

  /**
   *
   *
   */
  public form: FormGroup

  /**
   *
   *
   */
  public abstract validationMessages: ValidationMessages

  /**
   *
   *
   */
  public validationErrors: ValidationErrors = {}

  /**
   *
   *
   */
  constructor(protected formBuilder: FormBuilder) {
    this.createForm()
  }

  /**
   *
   *
   */
  protected abstract createFormModel(): FormGroup

  /**
   *
   *
   */
  protected updateErrors(data?: any) {
    this.validationErrors = this.getValidationErrors(this.form, this.validationMessages)
  }

  /**
   *
   *
   */
  public onSubmitClick(formModel: any, config: SubmitConfig = {}) {
    config = merge({}, { showErrors: true, submitEvenIfInvalid: false }, config)

    if (config.showErrors && !this.form.valid) {
      this.showErrors()
    }
    if (!config.submitEvenIfInvalid && !this.form.valid) {
      return
    }
    formModel = this.prepareFormModel(formModel)
    this.onSubmit.emit(formModel)
  }

  /**
   *
   *
   */
  protected prepareFormModel(formModel: any): any {
    return formModel
  }

  /**
   *
   *
   */
  protected showErrors(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).markAsTouched()
      this.updateErrors()
    })
  }

  /**
   * Build validation errors from validation messages and form model
   *
   */
  protected getValidationErrors(form: FormGroup, validationMessages: ValidationMessages): ValidationErrors {
    if (!form || !validationMessages) {
      return {}
    }
    // build form errors Object from validationMessages Object (same structure)
    let errors = Object.assign({}, ...Object.keys(validationMessages).map(key => ({ [key]: [] })))

    for (const field in errors) {
      const control = form.get(field)
      if (control && control.touched && !control.valid) {
        const messages = validationMessages[field]

        for (const key in control.errors) {
          errors[field].push(`${messages[key]} `)
        }
      }
    }
    return errors
  }

  /**
   *
   *
   */
  protected createForm(): void {
    this.form = this.createFormModel()
    this.form.valueChanges.subscribe(data => this.updateErrors(data))
    this.updateErrors() // (re)set validation messages now
  }
}
