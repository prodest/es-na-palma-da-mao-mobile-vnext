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
  veiculos: Promise<[{
    linha: number,
    destino: string,
    distancia: number
  }]>;

  coordenadas: {
    lat: number,
    lon: number
  };

  pontoProximo: {
    id: number,
    lat: number,
    lon: number
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public transcolOnlineRealTimeService: TranscolOnlineRealTimeService, private geolocation: Geolocation) {
  }

  async ionViewWillLoad() {
    /* TO DO: Colocar loading enquanto a lista de veículos não fica pronta */
    await this.getCoordenadas();
    this.veiculos = await this.nearVehicles();
  }

  async ionViewDidLoad() {
    
  }
  
  async getCoordenadas(): Promise<void> {
    let resp: Geoposition;

    try {
      resp = await this.geolocation.getCurrentPosition();
    } catch (error) {
      console.log("Erro ao obter as coordenadas", error);
    }
    
    this.coordenadas = {lat: resp.coords.latitude, lon: resp.coords.longitude};
  }

  findNearestStop() {

  }

  async nearVehicles(): Promise<any> {
    let resp = await this.transcolOnlineRealTimeService.getNextVehicles(1);
    /* mock */
    let veiculos = [
      {
        linha: 516,
        destino: "Terminal do Ibes",
        distancia: 3,
        numero: 23012
      },
      {
        linha: 501,
        destino: "Terminal de Vila Velha",
        distancia: 3.2,
        numero: 23013
      },
      {
        linha: 516,
        destino: "Terminal de Jacaraípe",
        distancia: 3.3,
        numero: 23014
      }
    ];

    /*
      TO DO:
        - criar um Model para os veículos, com linha e itinerario
        - instanciar os veículos e colocar no array
      */
    
    return veiculos;
  }

  /* TO DO: Calcular distância entre o aparelho e o ônibus */
  private calcDistance() {

  }

}
