import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { EnvVariables, Environment } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { Denuncia } from '../model/denuncia';
import { Escola } from '../model/escola';

/*
  Generated class for the SeduDenunciasApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeduDenunciasApiService {

  constructor(public http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  getMunicipios(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/municipios/`);
  }

  getSchools(): Observable<Escola[]> {
    return this.http.get<Escola[]>(`${this.env.api.seduDenuncias}/escolas/`);
  }

  getDemandTypes(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/denuncias/tipos/`);
  }

  getUserDemands(user): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/denuncias/`);
  }

  sendDemand(demand: Denuncia) {
    return this.http.post(`${this.env.api.seduDenuncias}/denuncia/`, demand);
  }

}
