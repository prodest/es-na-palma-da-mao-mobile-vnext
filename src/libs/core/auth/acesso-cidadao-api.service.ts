import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ANONYMOUS_HEADER } from '.';
import { EnvVariables } from './../environment';
import { Environment } from './../environment/environment';
import { AcessoCidadaoClaims, AcessoCidadaoResponse, Identity } from './models';

const transformRequest = obj => {
  let str: string[] = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
};

@Injectable()
export class AcessoCidadaoApiService {
  /**
   * Creates an instance of AuthService.
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private environment: Environment) { }

  /**
   *
   */
  login = (identity: Identity): Observable<AcessoCidadaoResponse> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      [ANONYMOUS_HEADER]: 'true'
    });

    return this.http.post<AcessoCidadaoResponse>(
      `${this.environment.identityServer.url}/connect/token`,
      transformRequest(identity),
      { headers }
    );
  };

  /**
   * Obtém as claims do usuário no acesso cidadão.
   *
   */
  getUserClaims = (): Observable<AcessoCidadaoClaims> =>
    this.http.get<AcessoCidadaoClaims>(`${this.environment.identityServer.url}/connect/userinfo`);

  /**
   * TODO:
   */
  resetPassword = (username: string): Observable<any> =>
    this.http.post<any>(`${this.environment.identityServer.url}/reset-password`, username);

  /**
   * TODO:
   */
  createUser = (user: any): Observable<any> =>
    this.http.post<any>(`${this.environment.identityServer.url}/createAccount`, user)
}
