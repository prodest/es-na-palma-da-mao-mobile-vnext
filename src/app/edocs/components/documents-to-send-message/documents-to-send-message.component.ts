import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { FormBase } from '@espm/core';
import { WizardStep } from '../../providers';
import { IMessageOutput } from '../../interfaces';

@Component({
  selector: 'edocs-documents-to-send-message',
  templateUrl: './documents-to-send-message.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendMessageComponent extends WizardStep<IMessageOutput> implements OnInit {

  defaultMessage: string = ''

  @ViewChild('messageForm') protected form: FormBase;

  constructor() {
    super();
  }

  ngOnInit(): void { }

  refresh(): void { }
}
