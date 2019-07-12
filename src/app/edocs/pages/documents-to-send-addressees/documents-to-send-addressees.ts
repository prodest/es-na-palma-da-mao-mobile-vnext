import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  segment: 'documentos-para-enviar-destinatarios'
})
@Component({
  selector: 'documents-to-send-addressees',
  templateUrl: './documents-to-send-addressees.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendAddresseesPage implements OnInit {

  closeIcon: string = 'close';
  colorCloseIcon: string = 'danger';
  addIcon: string = 'md-add-circle';
  colorAddIcon: string = 'dark';
  addAddresseesPage: string = 'DocumentsToSendAddAddresseesPage';

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

  constructor(public navCtrl: NavController) { }

  delAddresses(addressee: {nome: string; tipo: string}) {
    const index = this.addressees.indexOf(addressee);
    this.addressees.splice(index, 1);
  }

  addAddresses() {
    this.navCtrl.push(this.addAddresseesPage);
  }


  ngOnInit(): void { }

  refresh(): void { }


}