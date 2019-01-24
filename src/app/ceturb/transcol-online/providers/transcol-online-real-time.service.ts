import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TranscolOnlineRealTimeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TranscolOnlineRealTimeService {

  constructor(public http: HttpClient) {}

  getNextVehicles(stopId: number) {
    /* TO DO: Colocar URL nas variáveis de ambiente */
    return this.http.get(`https://api.es.gov.br/realtime/ponto/${stopId}/veiculos`);
  }
}
