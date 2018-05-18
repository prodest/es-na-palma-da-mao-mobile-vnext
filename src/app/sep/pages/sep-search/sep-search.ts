import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SepService } from './../../providers/sep.service';
import { FavoriteProtocol } from './../../model';
import { SepApiService } from './../../providers/sep-api.service';
import { Protocol } from '../../model/protocol';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
 * Generated class for the SepSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sep-search',
  templateUrl: 'sep-search.html',
  providers: [BarcodeScanner, SepService]
})
export class SepSearchPage implements OnDestroy {
  protocolNumberModel: string;
  favoriteProtocols$: Observable<FavoriteProtocol[]>;
  destroyed$ = new Subject();

  constructor(
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private sepService: SepService,
    private sepApiService: SepApiService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SepSearchPage');
  }

  /**
   *
   *
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  search(protocolNumber: string) {
    if (protocolNumber) {
      this.sepApiService.getProcessByNumber(protocolNumber).subscribe(this.goToProtocol);
    }
  }

  ionViewWillLoad() {
    this.favoriteProtocols$ = this.sepService.favoriteProtocols$.takeUntil(this.destroyed$);
  }

  goToProtocol = (protocol: Protocol) => {
    this.navCtrl.push('SepDetailsPage', { protocol: protocol });
  };

  scanBarcode() {
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
}
