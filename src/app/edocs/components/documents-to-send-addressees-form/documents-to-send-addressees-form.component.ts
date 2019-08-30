import { Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@espm/core';
import { Destination } from '../../state';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'edocs-documents-to-send-addressees-form',
  templateUrl: './documents-to-send-addressees-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsToSendAddresseesFormComponent extends FormBase implements OnInit, OnChanges {
  validationMessages = {};

  @Input() addressees: Destination[] = [];
  @Output() onRemoveAddressee: EventEmitter<number> = new EventEmitter()

  constructor(formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private alert:AlertController) {
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

  showName(addresee: Destination): void {
    const alert = this.alert.create({
      title: addresee.nome,
      message: addresee.descricao,
      buttons: ['OK'],
    });
    alert.present();
  }

  submit() {
    this.onSubmitClick(this.form.value);
    this.cdr.detectChanges();
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
