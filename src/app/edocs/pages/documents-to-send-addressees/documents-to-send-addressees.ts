import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'documentos-para-enviar-destinatarios'
})
@Component({
  selector: 'documents-to-send-addressees',
  templateUrl: './documents-to-send-addressees.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendAddresseesPage implements OnInit {

  closeIcon: string = 'md-close';
  colorCloseIcon: string = 'danger';
  addIcon: string = 'md-add-circle';
  colorAddIcon: string = 'dark';

  addressees: Array<{nome: string, tipo: string}> = [
    {
      nome: 'PRODEST',
      tipo: 'Órgão'

    },
    {
      nome: 'SEDU',
      tipo: 'Órgão'

    },
    {
      nome: 'CEASA',
      tipo: 'Órgão'

    },
    {
      nome: 'SEGER',
      tipo: 'Órgão'

    }
  ]

  constructor() { }

  ngOnInit(): void { }

  refresh(): void { }


}