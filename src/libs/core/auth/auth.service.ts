import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core/environment';
import { PushService } from '@espm/core/push';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { finalize, flatMap, map, tap } from 'rxjs/operators';

import { AcessoCidadaoService } from './acesso-cidadao.service';
import {
  AcessoCidadaoClaims as User,
  AcessoCidadaoIdentity,
  GoogleAuthResponse,
  Identity,
  SocialNetworkIdentity,
  Token
} from './models';
import { AuthStore } from './state';

/**
 * Facade de autenticação consumido por toda a aplicação
 *
 */
@Injectable()
export class AuthService {
  onDevice = false;

  /**
   * Creates an instance of AuthService.
   *
   */
  constructor(
    private authStore: AuthStore,
    private acessoCidadao: AcessoCidadaoService,
    private googlePlus: GooglePlus,
    private facebook: Facebook,
    private platform: Platform,
    private push: PushService,
    @Inject(EnvVariables) private environment: Environment // private pushService: PushService,
  ) {
    this.onDevice = this.platform.is('cordova');
  }

  /**
   *
   *
   */
  acessoCidadaoLogin = (username: string, password: string): Observable<User> => {
    let identity: AcessoCidadaoIdentity = {
      client_id: this.environment.identityServer.clients.espm.id,
      client_secret: this.environment.identityServer.clients.espm.secret,
      scope: this.environment.identityServer.defaultScopes,
      grant_type: 'password',
      username: username,
      password: password
    };

    return this.login(identity);
  };

  /**
   * Realiza o login usando o facebook
   * https://github.com/jeduan/cordova-plugin-facebook4
   *
   */
  facebookLogin = (): Observable<User> => {
    // autentica no faceboook provider
    const request = fromPromise(this.facebook.login(['email', 'public_profile']));

    return request.pipe(tap(this.saveFacebookAvatar), map(this.createFacebookIdentity), flatMap(this.login));
  };

  /**
   * Realiza o login usando conta do google
   *
   */
  googleLogin = (): Observable<User> => {
    let options = {
      scopes: 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      webClientId: this.environment.googleWebClientId, // optional clientId of your Web application from Credentials environment of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      offline: true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    };

    // autentica no google provider
    const request = fromPromise(this.googlePlus.login(options));

    return request.pipe(tap(this.saveGoogleAvatar), map(this.createGoogleIdentity), flatMap(this.login));
  };

  /**
   *
   *
   */
  logout() {
    // 1 - se desloga de todos os providers
    const googlePlusPromise = this.onDevice ? this.googlePlus.logout().catch(() => true) : Promise.resolve();

    const facebookPromise = this.onDevice
      ? this.facebook.getLoginStatus().then(status => {
          if (status.status === 'connected') {
            this.facebook.logout();
          }
        })
      : Promise.resolve();

    return Promise.all([googlePlusPromise, facebookPromise])
      .then(this.acessoCidadao.logout)
      .then(this.push.unregister)
      .then(this.push.init); // 3 - Restart push service to anonimous user
  }

  /**
   *
   *
   */
  refreshAccessTokenIfNeeded = (): Observable<Token> => this.acessoCidadao.refreshAccessTokenIfNeeded();

  /**
   *
   *
   */
  refreshUser = (): Observable<User> => this.acessoCidadao.getUserClaims();

  /************************************* Private API *************************************/

  /**
   *
   *
   */
  private login = (identity: Identity): Observable<User> =>
    this.acessoCidadao.login(identity).pipe(finalize(this.push.init));

  /**
   *
   *
   */
  private storeAvatarUrl = (avatarUrl: string): void => this.authStore.update({ avatarUrl: avatarUrl });

  /**
   *
   *
   */
  private createFacebookIdentity = (authReponse: FacebookLoginResponse): SocialNetworkIdentity => ({
    client_id: this.environment.identityServer.clients.espmExternalLoginAndroid.id,
    client_secret: this.environment.identityServer.clients.espmExternalLoginAndroid.secret,
    grant_type: 'customloginexterno',
    scope: this.environment.identityServer.defaultScopes,
    provider: 'Facebook',
    accesstoken: authReponse.authResponse.accessToken
  });

  /**
   *
   *
   */
  private createGoogleIdentity = (authReponse: GoogleAuthResponse): SocialNetworkIdentity => ({
    client_id: this.environment.identityServer.clients.espmExternalLoginAndroid.id,
    client_secret: this.environment.identityServer.clients.espmExternalLoginAndroid.secret,
    grant_type: 'customloginexterno',
    scope: this.environment.identityServer.defaultScopes,
    provider: 'Google',
    accesstoken: authReponse.idToken
  });

  /**
   *
   *
   */
  private saveFacebookAvatar = (resp: FacebookLoginResponse) =>
    this.storeAvatarUrl(`https://graph.facebook.com/v2.7/${resp.authResponse.userID}/picture?type=normal`);

  /**
   *
   *
   */
  private saveGoogleAvatar = (resp: GoogleAuthResponse) => this.storeAvatarUrl(resp.imageUrl);
}
