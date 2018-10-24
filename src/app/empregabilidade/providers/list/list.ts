import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ListProvider {
  API_URL = 'https://meufakedata.herokuapp.com/busca';
  constructor(public http: HttpClient) {}

  listarPorStatus(listaConcurso, status): Array<Concurso> {
    let concursosDesejados: Array<Concurso> = [];
    listaConcurso.forEach(concurso => {
      if (concurso.status === status) {
        concursosDesejados.push(concurso);
      }
    });
    return concursosDesejados;
  }
  async atualizaConcurso(concurso) {
    try {
      return await this.http.get(this.API_URL + '/' + concurso.id).toPromise();
    } catch (error) {
      throw error;
    }
  }
}
