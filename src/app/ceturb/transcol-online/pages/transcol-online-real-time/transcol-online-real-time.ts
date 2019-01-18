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
    await this.findNearestStop();
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
      resp = await this.geolocation.getCurrentPosition();
    } catch (error) {
      console.log("Erro ao obter as coordenadas", error);
    }
    
    this.myCoordinates = {
      latitude: resp.coords.latitude,
      longitude: resp.coords.longitude
    };
  }

  async findNearestStop() {
    /*
      Baixar todos os pontos
      Calcular a distância até cada um
      Ordenar pela menor distância
      Retornar o ID do mais próximo
    */

    /* TODO: Mover o download e armazenagem dos pontos para a raiz do Transcol Online */
    let stops = await this.apiCeturbV2Service.allStops() as Array<any>;

    stops.map((stop) => {
      stop.distancia = this.calcDistance(this.myCoordinates, {latitude: stop.latitude, longitude: stop.longitude});
    });

    sort(stops).by([{asc: 'distancia'}]);

    this.nearestStopId = stops[0]['id'];
  }

  async nearVehicles() {
    let response = await this.transcolOnlineRealTimeService.getNextVehicles(this.nearestStopId) as Array<any>;
    let vehicles: Array<Vehicle> = new Array<Vehicle>();
    
    response.map((vehicle) => {
      let v = new Vehicle();
      /* TODO: passar linha e destino para o 'v' */
      v.numero = vehicle.ROTULO;
      v.distancia = (vehicle.distance/1000).toFixed(2);
      vehicles.push(v);
    });
    
    this.vehicles = vehicles;
  }

  /* TO DO: Calcular distância entre o aparelho e um par de coordenadas */
  private calcDistance(origin: GeoCoord, destiny: GeoCoord): number {
    return this.haversineService.getDistanceInKilometers(origin, destiny);
  }

}
