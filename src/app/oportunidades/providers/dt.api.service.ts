import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';

import { Classificacao, Concurso } from '../model';
import { SelecaoStore, SelecaoQuery } from '../state';

/*
*
*/
@Injectable()
export class DtApiService {
  /**
   *
   */
  constructor(
    private http: HttpClient,
    @Inject(EnvVariables) private env: Environment,
    @Inject(SelecaoStore) private favoritosStore: SelecaoStore,
    @Inject(SelecaoQuery) private favoritosQuery: SelecaoQuery
  ) {}

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
  /**
   *
   */
  getFavoritos() {
    this.http.get(this.env.api.empregabilidade).subscribe(response => {
      this.favoritosStore.set(response);
    });
  }
  setFavoritos(concurso) {
    concurso.favorito = concurso.favorito === null ? false : concurso.favorito;
    this.favoritosStore.update(concurso.id, { favorito: !concurso.favorito });
    concurso = this.favoritosQuery.getEntity(concurso.id);
  }
}
