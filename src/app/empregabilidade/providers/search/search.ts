import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchProvider {
  API_URL = 'http://fakedata-icarodgl.c9users.io:8080';
  constructor(public http: HttpClient) {}
  search(parameter) {
    return new Promise(resolve => {
      this.http.get(this.API_URL + '/busca/').subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log('ERRO!', err);
          resolve({ message: 'erro' });
        }
      );
    });
  }
}
