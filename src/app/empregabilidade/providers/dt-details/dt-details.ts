import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Concurso } from '../../dto/Concurso';
import { Classificado } from '../../dto/Classificado';

/*
  Generated class for the DtDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DtDetailsProvider {
  URL = process.env.API_EMPREGABILIDADE_URL;
  constructor(public http: HttpClient) {}
  async concursoDetalhe(id): Promise<Concurso> {
    let concurso: Concurso = (await this.http.get(this.URL + id).toPromise()) as Concurso;
    return concurso;
  }
  async classificados(id): Promise<Array<Classificado>> {
    try {
      return (await this.http.get(this.URL + id + '/classificacao').toPromise()) as Array<Classificado>;
    } catch (error) {
      throw error;
    }
  }
}
