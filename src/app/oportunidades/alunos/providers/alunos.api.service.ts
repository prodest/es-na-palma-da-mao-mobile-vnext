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

type Distancia = {
  cpf: string,
  cursos: Array<number>
}

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

   getDistancias= (cpf: string): Observable<Distancia[]> => {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Basic user:pass`, 
      [ANONYMOUS_HEADER]: 'true'
    })
    let url = `${this.env.api.sugestaoaluno}/sugestao/pessoal/cpf?cpf=${cpf}`;
    return this.http.get<Distancia[]>(url, { headers }).pipe(share());
  } 

}
