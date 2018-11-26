import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranscolOnlineRealTimeService } from './../../providers';

/**
 * Generated class for the TranscolOnlineRealTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transcol-online-real-time',
  templateUrl: 'transcol-online-real-time.html',
})
export class TranscolOnlineRealTimePage {
  veiculos: [{
    linha: number,
    destino: string,
    distancia: number
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams, public transcolOnlineRealTimeService: TranscolOnlineRealTimeService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranscolOnlineRealTimePage');
  }

  /* getVeiculos() {
    let veiculos = this.transcolOnlineRealTimeService.getNextVehicles(this.getCoordenadas());
    this.veiculos = veiculos;
  } */

  getCoordenadas() {

  }

}
