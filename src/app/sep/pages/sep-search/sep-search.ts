import { Component, OnDestroy } from '@angular/core';
import { AndroidPermissionsService } from '@espm/core/permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';

import { Protocol } from './../../model';
import { SepService } from '../../providers';

@IonicPage({
  segment: 'sep/consulta'
})
@Component({
  selector: 'page-sep-search',
  templateUrl: 'sep-search.html'
})
export class SepSearchPage implements OnDestroy {
  protocolNumberModel: string;
  destroyed$ = new Subject();

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private barcodeScanner: BarcodeScanner,
    private permissions: AndroidPermissionsService,
    private sepService: SepService
  ) {}

  /**
   *
   *
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  search(protocolNumber: string) {
    if (!protocolNumber) {
      this.showMessage('Número do protocolo é obrigatório');
    } else if (protocolNumber.length < 2 || protocolNumber.length > 8) {
      this.showMessage('O número deve ter entre 2 e 8 dígitos');
    } else if (protocolNumber) {
      this.sepService.getProtocolByNumber(protocolNumber).subscribe(this.goToProtocol);
    }
  }

  ionViewWillLoad() {
    this.sepService.loadFavorites();
  }

  goToProtocol = (protocol: Protocol) => {
    this.navCtrl.push('SepDetailsPage', { protocol: protocol });
  };

  scanBarcode() {
    this.permissions.requestPermission(this.permissions.PERMISSION.CAMERA).then(request => {
      if (request.hasPermission) {
        let options = {
          preferFrontCamera: false,
          prompt: 'Posicione o código dentro da área de leitura', // supported on Android only
          format: 'CODE_39'
        };

        this.barcodeScanner
          .scan(options)
          .then(barcodeData => (barcodeData.cancelled ? null : this.search(barcodeData.text)))
          .catch(console.error);
      }
    });
  }

  private showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };
}
