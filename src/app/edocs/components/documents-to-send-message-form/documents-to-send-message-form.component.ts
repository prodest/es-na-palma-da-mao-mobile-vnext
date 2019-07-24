import { Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBase, AcessoCidadaoClaims } from '@espm/core';

@Component({
  selector: 'edocs-documents-to-send-message-form',
  templateUrl: './documents-to-send-message-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsToSendMessageFormComponent extends FormBase implements OnInit, OnChanges {

  @Input() message: string;

  validationMessages = {
    message: {
      required: 'Obrigatório'
    }
  };

  constructor(formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    super(formBuilder);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('message' in changes) {
      const message: AcessoCidadaoClaims = changes['message'].currentValue;
      if (message) {
        this.form.reset({ message })
      }
    }
  }

  submit() {
    this.onSubmitClick(this.form.value);
    setTimeout(() => this.cdr.detectChanges())
  }

  protected createFormModel(): FormGroup {
    return this.formBuilder.group({
      message: ['', [Validators.required]]
    });
  }
}
