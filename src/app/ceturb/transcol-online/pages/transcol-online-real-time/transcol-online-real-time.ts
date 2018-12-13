import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

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

  coordenadas: {
    lat: number,
    lon: number
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public transcolOnlineRealTimeService: TranscolOnlineRealTimeService, private geolocation: Geolocation) {
  }

  async ionViewWillLoad() {
    /* TO DO: Colocar loading enquanto a lista de veículos não fica pronta */
    await this.getCoordenadas();
    this.veiculos = this.nearVehicles();
  }

  async ionViewDidLoad() {
    
  }
  
  async getCoordenadas() {
    let resp: Geoposition;

    try {
      resp = await this.geolocation.getCurrentPosition();
    } catch (error) {
      console.log("Erro ao obter as coordenadas", error);
    }
    
    this.coordenadas = {lat: resp.coords.latitude, lon: resp.coords.longitude};
  }

  nearVehicles(): any {
    let veiculos = this.transcolOnlineRealTimeService.getNextVehicles(this.coordenadas);
    return veiculos;
  }

}
