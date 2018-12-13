import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Concurso } from '../../dto/Concurso';
import { Classificado } from '../../dto/Classificado';
import { EnvVariables, Environment } from '@espm/core';

/*
  Generated class for the DtDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DtDetailsProvider {
  constructor(public http: HttpClient, @Inject(EnvVariables) private env: Environment) {}
  async concursoDetalhe(id): Promise<Concurso> {
    let concurso: Concurso = (await this.http.get(this.env.api.empregabilidade + id).toPromise()) as Concurso;
    return concurso;
  }
  async classificados(id): Promise<Array<Classificado>> {
    try {
      return (await this.http.get(this.env.api.empregabilidade + id + '/classificacao').toPromise()) as Array<Classificado>;
    } catch (error) {
      throw error;
    }
  }
}
