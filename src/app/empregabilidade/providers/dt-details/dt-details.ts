import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Concurso } from '../../dto/Concurso';
import { Classificado } from '../../dto/Classificado';
import { EnvVariables, Environment } from '@espm/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DtDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DtDetailsProvider {
  constructor(public http: HttpClient, @Inject(EnvVariables) private env: Environment) {}
  concursoDetalhe(id): Observable<Concurso> {
    return this.http.get<Concurso>(this.env.api.empregabilidade + id);
  }
  classificados(id): Observable<Array<Classificado>> {
    return this.http.get<Array<Classificado>>(this.env.api.empregabilidade + id + '/classificacao');
  }
}
