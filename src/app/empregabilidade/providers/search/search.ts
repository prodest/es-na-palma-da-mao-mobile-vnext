import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable()
export class SearchProvider {
  API_URL = 'https://meufakedata.herokuapp.com/busca';
  constructor(public http: HttpClient, private storage: Storage) {}
  async salvaConcursos(concursos) {
    this.storage.set('listaDeConcursos', concursos);
    console.log('salvo', concursos);
  }
  async emMemoria() {
    let concursos = this.storage.get('listaDeConcursos');
    console.log('recuperando concursos', concursos);
    return concursos;
  }
  async search(parameter) {
    /*
    return new Promise(resolve => {
      this.http.get(this.API_URL).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log('ERRO!', err);
          resolve({ message: 'erro' });
        }
      );
    });*/
    try {
      return await this.http.get(this.API_URL).toPromise();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
