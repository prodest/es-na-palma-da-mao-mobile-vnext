import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { share } from 'rxjs/operators'
import { EnvVariables, Environment } from '@espm/core';

@Injectable()
export class ApiCeturbV2Service {

  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {

  }

  allStops() {
    return this.http.get(`${this.env.api.ceturbv2}/pontos`).pipe(share());
  }
}
