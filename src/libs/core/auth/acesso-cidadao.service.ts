import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { flatMap, map, tap } from 'rxjs/operators';

import { Environment, EnvVariables } from './../environment';
import { AcessoCidadaoApiService } from './acesso-cidadao-api.service';
import { JwtHelper } from './jwt-helper';
import { AcessoCidadaoClaims, AcessoCidadaoIdentity, AcessoCidadaoResponse, Identity, Token } from './models';
import { AuthQuery, AuthStore } from './state';

/**
 * Classe para autenticação usando IdentityServer3 no acessso cidadão
 * Centraliza acesso a token, claims e local-storage de autenticação
 */
@Injectable()
export class AcessoCidadaoService {
  /**
   * Creates an instance of AcessoCidadaoService.
   *
   */
  constructor(
    private api: AcessoCidadaoApiService,
    private authStore: AuthStore,
    private authQuery: AuthQuery,
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
   */
  login(identity: Identity): Observable<AcessoCidadaoClaims> {
    return this.api.login(identity).pipe(tap(this.storeAuthResponse), flatMap(this.getUserClaims));
  }

  /**
   * Faz logout do usuário. Remove o token do localstore e os claims salvos.
   */
  logout = () => {
    this.authStore.reset();
  };

  /**
   * Atualiza e retorna o access token quando necessário baseado em sua data de expiração.
   *
   */
  refreshAccessTokenIfNeeded = (): Observable<Token> => {
    if (!this.authQuery.state.refreshToken) {
      _throw({ message: 'no-token' });
    }

    let now = new Date();
    let accessToken = this.authQuery.state.accessToken;
    let accessToken$ = of(accessToken);

    // Usa o token ainda válido e faz um refresh token em background (não-bloqueante)
    if (accessToken && this.jwt.isTokenIsExpiringIn(accessToken, now)) {
      this.refreshAccessToken().subscribe();
    }

    // Faz um refresh token e espera pra retornar o novo token "refreshado"
    if (accessToken && this.jwt.isTokenExpired(accessToken, now)) {
      accessToken$ = this.refreshAccessToken();
    }

    return accessToken$;
  };

  /**
   *
   *
   */
  getUserClaims = (): Observable<AcessoCidadaoClaims> => this.api.getUserClaims().pipe(tap(this.storeClaims));

  /**
   * TODO:
   */
  resetPassword = (username: string): Observable<any> => this.api.resetPassword(username);

  /**
   * TODO:
   */
  createUser = (user: any): Observable<any> => this.api.createUser(user);

  /************************************* Private API *************************************/

  /**
   *
   *
   */
  private refreshAccessToken = (): Observable<Token> =>
    this.login(this.createRefreshTokenIdentity()).pipe(map(() => this.authQuery.state.accessToken));

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

    if (this.authQuery.state.clientId === this.environment.identityServer.clients.espm.id) {
      identity.client_id = this.environment.identityServer.clients.espm.id;
      identity.client_secret = this.environment.identityServer.clients.espm.secret;
    }

    identity.refresh_token = this.authQuery.state.refreshToken;

    return identity;
  };

  /**
   * Store auth info
   *
   */
  private storeAuthResponse = (response: AcessoCidadaoResponse) => {
    this.authStore.update({
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      clientId: this.jwt.decodeToken(response.access_token).client_id
    });
  };

  /**
   * Store user info (claims)
   *
   */
  private storeClaims = (claims: AcessoCidadaoClaims) => this.authStore.update({ claims });
}
