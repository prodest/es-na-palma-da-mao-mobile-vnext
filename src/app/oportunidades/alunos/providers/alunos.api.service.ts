import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables, ANONYMOUS_HEADER } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { Concurso } from '../model';
import { share } from 'rxjs/operators';
import { ConcursoFavorito } from '../model/concurso-favorito.model';
/*
*
*/
@Injectable()
export class AlunosApiService {
  /**
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}
  /**
   *
   */
  getConcurso(id): Observable<Concurso> {
    return this.http.get<Concurso>(`${this.env.api.selecaoalunos}/${id}`).pipe(share());
  }
  /**
   *
   */
  getAllConcursos = (): Observable<Concurso[]> => {
    return this.http.get<Concurso[]>(this.env.api.selecaoalunos).pipe(share());
  };
  syncFavorites = (favoritos): Observable<ConcursoFavorito> => {
    return this.http
      .post<ConcursoFavorito>(`${this.env.api.espm}/studentOpportunities/data/favorite`, favoritos)
      .pipe(share());
  };
  /* Concetando api dos alunos - distnacia */ 
  getDistancias= (cpf: string, municipio_curso: string): Observable<Concurso[]> => {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Basic user:pass`, 
      [ANONYMOUS_HEADER]: 'true'
    })
    let url = `${this.env.api.sugestaodt}/sugestao/cpf/orgao?cpf=${cpf}&`+municipio_curso;
    return this.http.get<Concurso[]>(url, { headers }).pipe(share());

  }

}
