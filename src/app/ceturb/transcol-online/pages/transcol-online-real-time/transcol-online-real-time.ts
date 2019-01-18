import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { HaversineService, GeoCoord } from 'ng2-haversine';

import { TranscolOnlineRealTimeService, ApiCeturbV2Service } from './../../providers';
import { Vehicle } from '../../model';
import sort from 'fast-sort';



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
  vehicles: Vehicle[];
  myCoordinates: GeoCoord;
  nearestStopId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public transcolOnlineRealTimeService: TranscolOnlineRealTimeService,
    public apiCeturbV2Service: ApiCeturbV2Service,
    private geolocation: Geolocation,
    public haversineService: HaversineService
    ) {
  }

  async ionViewWillLoad() {
    const loader = this.presentLoading();
    await this.getCoordinates();
    console.log("coordenadas: ", this.myCoordinates);
    await this.findNearestStop();
    console.log("id do ponto mais próximo: ", this.nearestStopId);
    await this.nearVehicles();
    loader.dismiss();
  }

  async ionViewDidLoad() {
    
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }
  
  async getCoordinates() {
    let resp: Geoposition;

    try {
      console.log("pegando coordenadas");
      resp = await this.geolocation.getCurrentPosition();
    } catch (error) {
      console.log("Erro ao obter as coordenadas", error);
    }
    
    this.myCoordinates = {
      latitude: resp.coords.latitude,
      longitude: resp.coords.longitude
    };
    console.log("carregou as coordenadas");
  }

  async findNearestStop() {
    /* TODO:
      Baixar todos os pontos
      Calcular a distância até cada um
      Ordenar pela menor distância
      Retornar o ID do mais próximo
    */

    let stops = await this.apiCeturbV2Service.allStops() as Array<any>;
    console.log("baixou todos os pontos");

    stops.map((stop) => {
      stop.distancia = this.calcDistance(this.myCoordinates, {latitude: stop.latitude, longitude: stop.longitude});
    });
    console.log("calculou as distancias");

    sort(stops).by([{asc: 'distancia'}]);

    this.nearestStopId = stops[0]['id'];
    console.log("carregou o ponto");
  }

  async nearVehicles() {
    let response = await this.transcolOnlineRealTimeService.getNextVehicles(this.nearestStopId) as Array<Vehicle>;
    this.vehicles = response;
    /* mock */
    /* let veiculos = [
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
    ]; */
    
    // return veiculos;
  }

  /* TO DO: Calcular distância entre o aparelho e um par de coordenadas */
  private calcDistance(origin: GeoCoord, destiny: GeoCoord): number {
    return this.haversineService.getDistanceInKilometers(origin, destiny);
  }

}
