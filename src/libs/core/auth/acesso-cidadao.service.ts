import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, map } from 'rxjs/operators';

import { ANONYMOUS_HEADER } from '.';
import { EnvVariables } from './../environment';
import { Environment } from './../environment/environment';
import { AuthStorage } from './auth-storage.service';
import { JwtHelper } from './jwt-helper';
import { AcessoCidadaoResponse } from './models/authResponses/acessoCidadaoResponse';
import { AcessoCidadaoClaims } from './models/claims/acessoCidadaoClaims';
import { AcessoCidadaoIdentity } from './models/identities/acessoCidadaoIdentity';
import { Identity } from './models/identities/identity';
import { Token } from './models/token';

const transformRequest = obj => {
  let str: string[] = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
};

/**
 * Classe para autenticação usando IdentityServer3 no acessso cidadão
 * Centraliza acesso a token, claims e local-storage de autenticação
 *
 */
@Injectable()
export class AcessoCidadaoService {
  // private static refreshingToken: boolean = false

  /**
   * Creates an instance of AcessoCidadaoService.
   *
   */
  constructor(
    private http: HttpClient,
    private authStorage: AuthStorage,
    private jwt: JwtHelper,
    @Inject(EnvVariables) private environment: Environment
  ) {}

  /**
   * Autentica o usuário no acesso cidadão
   *   1) Efetua login e obtém as claims de usuário do acesso cidadão
   *   2) Cria uma usuário com os dados das claims + informações extras ( avatarUrl, anonymous, isAuthenticated ...)
   *   3) Se o login foi via provider externo (google, facebook), tenta buscar a url do avatar do provider. Usa padrão como fallback
   *   4) Salva o usuário no local storage.
   *   5) Reinicia o serviço de push
   *
   */
  login = (identity: Identity): Observable<AcessoCidadaoClaims> => {
    return this.getToken(identity).pipe(
      flatMap(this.saveAccessToken),
      flatMap(this.saveRefreshToken),
      flatMap(this.saveClientId),
      flatMap(this.getUserClaims)
    );
  };

  /**
   * Faz logout do usuário. Remove o token do localstore e os claims salvos.
   */
  logout = () => this.authStorage.reset();

  /**
   * Retorna se tem usuário logado ou não.
   */
  get isAuthenticated(): boolean {
    return !!this.authStorage.getValue('accessToken') && !this.jwt.isTokenExpired(this.authStorage.getValue('accessToken')); // && !!this.user
  }

  /**
   * Atualiza e retorna o access token quando necessário baseado em sua data de expiração.
   *
   */
  refreshAccessTokenIfNeeded = (): Observable<Token> => {
    if (!this.authStorage.getValue('refreshToken')) {
      _throw({ message: 'no-token' });
    }

    let currentDate = new Date();
    let token = of(this.authStorage.getValue('accessToken'));

    // Usa o token ainda válido e faz um refresh token em background (não-bloqueante)
    if (this.isTokenIsExpiringIn(currentDate)) {
      this.refreshAccessToken().subscribe();
    }

    // Faz um refresh token e espera pra retornar o novo token "refreshado"
    if (this.isTokenExpiredIn(currentDate)) {
      token = this.refreshAccessToken();
    }

    return token;
  };

  /**
   * Obtém as claims do usuário no acesso cidadão.
   *
   */
  getUserClaims = (): Observable<AcessoCidadaoClaims> =>
    this.http.get<AcessoCidadaoClaims>(`${this.environment.identityServer.url}/connect/userinfo`);

  /************************************* Private API *************************************/

  /**
   *
   *
   */
  private refreshAccessToken = (): Observable<Token> => {
    // todo
    // if (!this.acessoCidadaoResponse || AcessoCidadaoService.refreshingToken) {
    //   return Promise.reject(new Error('Usuário não logado'))
    // }

    // AcessoCidadaoService.refreshingToken = true

    return this.login(this.createRefreshTokenIdentity()).pipe(
      // finalize(() => (AcessoCidadaoService.refreshingToken = false)),
      map(() => this.authStorage.getValue('accessToken'))
    );
  };

  /**
   *
   *
   */
  private createRefreshTokenIdentity = (): AcessoCidadaoIdentity => {
    let identity: AcessoCidadaoIdentity = {
      client_id: this.environment.identityServer.clients.espmExternalLoginAndroid.id,
      client_secret: this.environment.identityServer.clients.espmExternalLoginAndroid.secret,
      grant_type: 'refresh_token',
      scope: this.environment.identityServer.defaultScopes
    };

    if (this.authStorage.getValue('clientId') === 'espm') {
      identity.client_id = this.environment.identityServer.clients.espm.id;
      identity.client_secret = this.environment.identityServer.clients.espm.secret;
    }

    identity.refresh_token = this.authStorage.getValue('refreshToken');

    return identity;
  };

  /**
   *  Faz a requisição de um token no IdentityServer3, a partir dos dados fornecidos
   *
   */
  private getToken = (identity: Identity): Observable<AcessoCidadaoResponse> => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      [ANONYMOUS_HEADER]: 'true'
    });

    return this.http.post<AcessoCidadaoResponse>(
      `${this.environment.identityServer.url}/connect/token`,
      transformRequest(identity),
      {
        headers
      }
    );
  };

  /**
   *
   *
   */
  private isTokenExpiredIn = (date: Date) => {
    const token = this.authStorage.getValue('accessToken');
    return token && this.jwt.isTokenExpired(token, date);
  };

  /**
   *
   *
   */
  private isTokenIsExpiringIn = (date: Date) => {
    const token = this.authStorage.getValue('accessToken');
    return token && this.jwt.isTokenIsExpiringIn(token, date);
  };

  /**
   * Persiste access token
   *
   */
  private saveAccessToken = (response: AcessoCidadaoResponse) => {
    return this.authStorage.setValue('accessToken', response.access_token).then(() => response);
  };

  /**
   * Persiste rerfresh token
   *
   */
  private saveRefreshToken = (response: AcessoCidadaoResponse) => {
    return this.authStorage.setValue('refreshToken', response.refresh_token).then(() => response);
  };

  /**
   * Persiste client id
   *
   */
  private saveClientId = (response: AcessoCidadaoResponse) => {
    return this.authStorage.setValue('clientId', this.jwt.decodeToken(response.access_token).client_id).then(() => response);
  };
}
