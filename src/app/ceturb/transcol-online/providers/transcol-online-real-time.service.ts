import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TranscolOnlineRealTimeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TranscolOnlineRealTimeService {

  constructor(public http: HttpClient) {
    console.log('Hello TranscolOnlineRealTimeServices');
  }

  getNextVehicles(coordenadas: {lat: string, lon: string}) {
    /* let result = this.http.get("", ) */
    return [
      {
        linha: 516,
        destino: "Terminal do Ibes",
        distancia: 3
      },
      {
        linha: 501,
        destino: "Terminal de Vila Velha",
        distancia: 3.2
      },
      {
        linha: 516,
        destino: "Terminal de Jacaraípe",
        distancia: 3.3
      }
    ];
  }

}
