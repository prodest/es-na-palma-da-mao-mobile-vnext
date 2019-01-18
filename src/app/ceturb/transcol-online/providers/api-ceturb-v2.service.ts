import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiCeturbV2Service {

  constructor(private http: HttpClient) {

  }

  async allStops() {
    /* TO DO: Colocar URL nas variáveis de ambiente */
    let result = await this.http.get(`https://api.es.gov.br/transcol/pontos`).toPromise();
    return result;
  }
}
