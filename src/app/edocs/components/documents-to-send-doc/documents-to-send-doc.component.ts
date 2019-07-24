import { ChangeDetectionStrategy, Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBase } from '@espm/core';
import { WizardStep } from '../../providers';
import { IDocStepOutput } from '../../interfaces';

@Component({
  selector: 'edocs-documents-to-send-doc',
  templateUrl: './documents-to-send-doc.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendDocComponent extends WizardStep<IDocStepOutput> implements OnInit {

  @Input() file: string;
  documents = [];
  @ViewChild('docForm') protected form: FormBase;

  constructor() {
    super();
  }

  ngOnInit(): void { }

  refresh(): void { }

}
