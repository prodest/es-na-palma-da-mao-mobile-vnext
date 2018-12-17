import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Concurso } from '../../dto/Concurso';
import { EnvVariables, Environment } from '@espm/core';
import { Observable } from 'rxjs';
@Injectable()
export class SearchProvider {
  constructor(public http: HttpClient, private storage: Storage, @Inject(EnvVariables) private env: Environment) {}

  async salvaFavoritos(novoConcurso) {
    let concursosfavoritos = await this.carregaFavoritos();
    let novoNoArray = [];
    novoNoArray.push(novoConcurso);
    if (concursosfavoritos.some(element => element.id === novoConcurso.id)) {
      concursosfavoritos = concursosfavoritos.filter(element => element.id !== novoConcurso.id);
    } else {
      concursosfavoritos.push(novoConcurso);
    }
    this.storage.set('listaDeConcursos', concursosfavoritos);
    return concursosfavoritos;
  }

  async carregaFavoritos(): Promise<Array<Concurso>> {
    let concursos: Array<Concurso> = (await this.storage.get('listaDeConcursos')) as Array<Concurso>;
    return concursos;
  }

  search(): Observable<Array<Concurso>> {
    return this.http.get<Array<Concurso>>(this.env.api.empregabilidade);
  }
}
