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

  mdCloseIcon: string = 'ios-trash';
  iosCloseIcon: string = 'md-trash';
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

    },
    {
      nome: 'DETRAN',
      tipo: 'Órgão'

    },
    {
      nome: 'IPEM-ES',
      tipo: 'Órgão'

    },
    {
      nome: 'PMES',
      tipo: 'Órgão'

    },
    {
      nome: 'SEJUS',
      tipo: 'Órgão'

    },
    {
      nome: 'SETUR',
      tipo: 'Órgão'

    },
    {
      nome: 'IEMA',
      tipo: 'Órgão'

    }
  ]

  constructor() { }

  delAddresses() {
    
  }
  ngOnInit(): void { }

  refresh(): void { }


}