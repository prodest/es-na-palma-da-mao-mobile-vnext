import { Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@espm/core';
import { Destination } from '../../state';

@Component({
  selector: 'edocs-documents-to-send-addressees-form',
  templateUrl: './documents-to-send-addressees-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsToSendAddresseesFormComponent extends FormBase implements OnInit, OnChanges {
  validationMessages = {};

  @Input() addressees: Destination[] = [];

  constructor(formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    super(formBuilder);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('addressees' in changes) {
      const addressees: Destination[] = changes['addressees'].currentValue;
      if (addressees) {
        this.form.reset({ addressees });
        this.cdr.detectChanges();
      }
    }
    this.showErrors();
  }

  submit() {
    this.onSubmitClick(this.form.value);
    this.cdr.detectChanges();
  }

  delAddresses(addressees) {
    const index = this.addressees.indexOf(addressees);
    this.addressees.splice(index, 1);
  }

  limite = (valor: string) => {
    if (valor.length > 7) {
      return valor.substring(0, 7) + '…';
    } else {
      return valor;
    }
  };

  protected createFormModel(): FormGroup {
    return this.formBuilder.group({
      addressees: [[], [Validators.required, Validators.minLength(1)]]
    });
  }
}
