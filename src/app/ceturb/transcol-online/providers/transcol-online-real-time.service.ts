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

  async getNextVehicles(stopId: number) {
    /* TO DO: Colocar URL nas variáveis de ambiente */
    let result = await this.http.get(`https://api.es.gov.br/realtime/ponto/${stopId}/veiculos`).toPromise();
    console.log(result);
    return result;
  }
}
