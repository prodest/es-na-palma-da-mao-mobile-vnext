import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'edocs-documents-to-send-doc',
  templateUrl: './documents-to-send-doc.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendDocComponent implements OnInit {

  documents = [];
  roleOptions = {
    title: 'Cargo / Função',
    subTitle: 'Selecione o cargo ou a função que deseja capturar e encaminhar o documento atual'
  }
  documentTypeOptions = {
    title: 'Tipo de documento',
    subTitle: 'Selecione o tipo do documento atual'
  }
  documentPaperTypeOptions = {
    title: 'Documento em papel',
    subTitle: 'Selecione como o documento em papel foi tirado foto ou escaneado'
  }
  documentAssignTypeOptions = {
    title: 'Tipo de assinatura',
    subTitle: 'Selecione o tipo de assinatura para o documento atual'
  }

  name: string = '';
  role: string = '';
  documentType: number = NaN;
  documentPaperType: number = NaN;
  documentAssignType: number = NaN;

  constructor() { }

  ngOnInit(): void { }

  refresh(): void { }

  isValidNumber(value: any) {
    return typeof value === 'number' && !isNaN(value)
  }

}
