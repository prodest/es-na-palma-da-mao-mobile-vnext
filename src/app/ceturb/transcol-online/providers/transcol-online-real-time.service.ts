import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { EnvVariables, Environment } from '@espm/core';

/*
  Generated class for the TranscolOnlineRealTimeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TranscolOnlineRealTimeService {

  constructor(public http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   * Retorna os veículos no entorno de um ponto de ônibus e suas distâncias.
   * @param stopId - ID do ponto que será referência.
   */
  getNextVehicles(stopId: number) {
    return this.http.get(`${this.env.api.realtime}/ponto/${stopId}/veiculos`);
  }
}
