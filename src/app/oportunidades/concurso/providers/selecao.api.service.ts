import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables, ANONYMOUS_HEADER } from '@espm/core';
import { Observable } from 'rxjs/Observable';

import { Classificacao, Concurso } from '../model';
import { share } from 'rxjs/operators';
import { ConcursoFavorito } from '../model/concurso-favorito.mode';

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
    try {
      return this.http.get<Concurso>(`${this.env.api.empregabilidade}/${id}`).pipe(share());
    } catch (error) {
      console.log('Erro em getConcurso', error);
    }
  }

  /**
   *
   */
  getClassificacao(idConcurso, idCargo): Observable<Classificacao[]> {
    try {
      return this.http
        .get<Classificacao[]>(`${this.env.api.empregabilidade}/${idConcurso}/cargo/${idCargo}/classificacao`)
        .pipe(share());
    } catch (error) {
      console.log('Erro em getClassificacao', error);
    }
  }

  /**
   *
   */
  getAllConcursos = (): Observable<Concurso[]> => {
    try {
      return this.http.get<Concurso[]>(this.env.api.empregabilidade).pipe(share());
    } catch (error) {
      console.log('Erro em getAllConcursos', error);
    }
  };
  /**
   *
   */
  getFavorites = (): Observable<ConcursoFavorito> => {
    try {
      return this.http.get<ConcursoFavorito>(`${this.env.api.espm}/publicTender/data/favorite`).pipe(share());
    } catch (error) {
      console.log('Erro em getFavorites', error);
    }
  };

  /**
   *
   *
   *
   */
  getPorcentagem = (cpf: string): Observable<Concurso[]> => {
    /* autenticacao api */

    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Basic ${btoa('user:pass')}`,
      [ANONYMOUS_HEADER]: 'true',
    });
    let url = `${this.env.api.sugestaodt}/sugestao/pessoa/${cpf}`;
    try {
      return this.http
        .get<Concurso[]>(url, { headers })
        .pipe(share());
    } catch (error) {
      console.log('Erro em getPorcentagem', error);
    }

    // /cpf/orgao?cpf=<cpf_que _voce_vai_mandar>&orgao=<primeiro_orgao>&orgao=<segundo_orgao>
  };

  /**
   *
   */
  syncFavorites = (favoritos): Observable<ConcursoFavorito> => {
    try {
      return this.http.post<ConcursoFavorito>(`${this.env.api.espm}/publicTender/data/favorite`, favoritos).pipe(share());
    } catch (error) {
      console.log('Erro em syncFavorites', error);
    }
  };
}
