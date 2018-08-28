import { Component, OnDestroy } from '@angular/core';
import { AndroidPermissionsService } from '@espm/core/permissions';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';

import { Protocol } from './../../model';
import { SepService } from '../../providers';
import { takeUntil } from 'rxjs/operators';
import { AuthQuery } from '@espm/core';

@IonicPage({
  segment: 'sep/consulta'
})
@Component({
  selector: 'page-sep-search',
  templateUrl: 'sep-search.html'
})
export class SepSearchPage implements OnDestroy {
  protocolId: string;
  destroyed$ = new Subject();

  /**
   *
   *
   */
  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private barcodeScanner: BarcodeScanner,
    private permissions: AndroidPermissionsService,
    private authQuery: AuthQuery,
    public sepService: SepService
  ) {}

  /**
   *
   *
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  /**
   *
   *
   */
  search(protocol: string) {
    if (!protocol) {
      this.showMessage('O protocolo é obrigatório');
    } else if (protocol.length < 2 || protocol.length > 13) {
      this.showMessage('O protocolo deve ter entre 2 e 13 dígitos');
    } else if (protocol) {
      this.sepService.getProtocol(protocol).subscribe(this.goToProtocol);
    }
  }

  /**
   *
   *
   */
  ionViewWillLoad() {
    if (this.authQuery.isLoggedIn) {
      this.sepService
        .loadFavorites()
        .pipe(takeUntil(this.destroyed$))
        .subscribe();
    }
  }

  /**
   *
   * 
   */
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

  /**
   *
   *
   */
  private goToProtocol = (protocol: Protocol) => {
    this.navCtrl.push('SepDetailsPage', { protocol: protocol });
  };

  /**
   *
   *
   */
  private showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };
}
