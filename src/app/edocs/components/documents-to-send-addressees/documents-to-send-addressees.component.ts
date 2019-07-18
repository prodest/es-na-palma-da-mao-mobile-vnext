import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Destination } from '../../state';

@Component({
  selector: 'edocs-documents-to-send-addressees',
  templateUrl: './documents-to-send-addressees.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendAddresseesComponent implements OnInit {
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
    if (valor.length > 7) {
      return valor.substring(0, 7) + '…';
    } else {
      return valor;
    }
  };

  ngOnInit(): void {}

  refresh(): void {}
}
