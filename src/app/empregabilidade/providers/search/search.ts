import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchProvider {
  API_URL = 'http://meufakedata.herokuapp.com/busca';
  constructor(public http: HttpClient) {}
  search(parameter) {
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
    });
  }
}
