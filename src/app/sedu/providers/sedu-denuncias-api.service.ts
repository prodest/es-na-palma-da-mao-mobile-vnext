import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { EnvVariables, Environment } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { Denuncia } from '../model/denuncia';

/*
  Generated class for the SeduDenunciasApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SeduDenunciasApiProvider {

  constructor(public http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  getSchools(): Observable<any> {
    return this.http.get(`${this.env.api.seduDenuncias}/escolas`);
  }

  sendDemand(demand: Denuncia) {
    return this.http.post(this.env.api.seduDenuncias, demand);
  }

}
