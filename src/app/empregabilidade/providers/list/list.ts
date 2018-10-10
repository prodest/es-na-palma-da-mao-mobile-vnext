import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ListProvider {
  constructor(public http: HttpClient) {}

  listarAberto(listaConcurso, status) {
    let concursosDesejados: Array<any> = [];
    listaConcurso.forEach(concurso => {
      if (concurso.status === status) {
        concursosDesejados.push(concurso);
      }
    });
    return concursosDesejados;
  }
}
