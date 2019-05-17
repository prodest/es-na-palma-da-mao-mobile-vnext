import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
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
}
