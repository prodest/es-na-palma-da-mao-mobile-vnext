import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators'

@Injectable()
export class ApiCeturbV2Service {

  constructor(private http: HttpClient) {

  }

  allStops() {
    /* TO DO: Colocar URL nas variáveis de ambiente */
    return this.http.get(`https://api.es.gov.br/transcol/pontos`).pipe(share());
  }
}
  