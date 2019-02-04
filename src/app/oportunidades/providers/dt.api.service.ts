import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';

import { Classificacao, Concurso } from '../model';

/*
*
*/
@Injectable()
export class DtApiService {
  /**
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   */
  getConcurso(id): Observable<Concurso> {
    return this.http.get<Concurso>(`${this.env.api.empregabilidade}/${id}`);
  }

  /**
   *
   */
  getClassificacao(idConcurso, idCargo): Observable<Array<Classificacao>> {
    return this.http.get<Classificacao[]>(`${this.env.api.empregabilidade}/${idConcurso}/cargo/${idCargo}/classificacao`);
  }

  /**
   *
   */
  gelAllConcursos(): Observable<Array<Concurso>> {
    return this.http.get<Concurso[]>(this.env.api.empregabilidade);
  }
}
