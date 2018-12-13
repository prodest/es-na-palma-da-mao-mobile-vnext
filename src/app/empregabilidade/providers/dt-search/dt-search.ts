import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Concurso } from '../../dto/Concurso';
@Injectable()
export class SearchProvider {
  URL = process.env.API_EMPREGABILIDADE_URL;
  constructor(public http: HttpClient, private storage: Storage) {}

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

  async search(): Promise<Array<Concurso>> {
    try {
      return (await this.http.get(this.URL).toPromise()) as Array<Concurso>;
    } catch (error) {
      throw error;
    }
  }
}
