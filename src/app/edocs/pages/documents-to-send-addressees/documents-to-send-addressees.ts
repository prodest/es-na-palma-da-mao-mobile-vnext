import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Destination } from '../../state';

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

  addressees: Destination[] = [];

  constructor(public navCtrl: NavController) {}

  delAddresses(addressees) {
    const index = this.addressees.indexOf(addressees);
    this.addressees.splice(index, 1);
  }

  addAddresses() {
    this.navCtrl.push(this.addAddresseesPage, this.addressees);
  }

  limite = (valor: string) => {
    if (valor.length > 12) {
      return valor.substring(0, 7) + '…';
    } else {
      return valor;
    }
  };

  ngOnInit(): void {}

  refresh(): void {}
}
