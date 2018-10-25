import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable()
export class SearchProvider {
  API_URL = 'https://meufakedata.herokuapp.com/busca';
  constructor(public http: HttpClient, private storage: Storage) {}

  async salvaFavoritos(novoConcurso) {
    let concursosfavoritos = await this.carregaFavoritos();
    let novoNoArray: Array<Concurso> = [];
    novoNoArray.push(novoConcurso);
    if (concursosfavoritos.some(element => element.id == novoConcurso.id)) {
      concursosfavoritos = concursosfavoritos.filter(element => element.id != novoConcurso.id);
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

  async search(parameter): Promise<Array<Concurso>> {
    try {
      return (await this.http.get(this.API_URL + '?nome=' + parameter).toPromise()) as Array<Concurso>;
    } catch (error) {
      throw error;
    }
  }
}
