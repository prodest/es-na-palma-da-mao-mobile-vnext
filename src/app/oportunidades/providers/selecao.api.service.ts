import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';

import { Classificacao, Concurso } from '../model';
import { share } from 'rxjs/operators';
import { ID } from '@datorama/akita';

/*
*
*/
@Injectable()
export class SelecaoApiService {
  /**
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   */
  getConcurso(id): Observable<Concurso> {
    return this.http.get<Concurso>(`${this.env.api.empregabilidade}/${id}`).pipe(share());
  }

  /**
   *
   */
  getClassificacao(idConcurso, idCargo): Observable<Classificacao[]> {
    return this.http
      .get<Classificacao[]>(`${this.env.api.empregabilidade}/${idConcurso}/cargo/${idCargo}/classificacao`)
      .pipe(share());
  }

  /**
   *
   */
  getAllConcursos = (): Observable<Concurso[]> => {
    return this.http.get<Concurso[]>(this.env.api.empregabilidade).pipe(share());
  };
  /**
   *
   */
  getFavorites = (): Observable<ID[]> => {
    return this.http.get<ID[]>(`${this.env.api.espm}/publicTender/data/favorite`).pipe(share());
  };
  syncFavorites = (favoritos): Observable<ID[]> => {
    return this.http.post<ID[]>(`${this.env.api.espm}/publicTender/data/favorite`, favoritos).pipe(share());
  };
}
