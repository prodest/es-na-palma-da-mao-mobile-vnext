import { Inject, Injectable } from '@angular/core'
import { Environment, EnvVariables } from '@espm/core/environment'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus'
import { Platform } from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { flatMap, map, tap } from 'rxjs/operators'

import { AcessoCidadaoService } from './acesso-cidadao.service'
import { AuthStorage } from './auth-storage.service'
import {
    AcessoCidadaoClaims,
    AcessoCidadaoIdentity,
    GoogleAuthResponse,
    Identity,
    SocialNetworkIdentity,
    Token,
    User
} from './models'

/**
 * Facade de autenticação consumido por toda a aplicação
 *
 */
@Injectable()
export class AuthService {
    onDevice = false

    /**
     * Creates an instance of AuthService.
     *
     */
    constructor (
        private authStorage: AuthStorage,
        private acessoCidadao: AcessoCidadaoService,
        private googlePlus: GooglePlus,
        private facebook: Facebook,
        private platform: Platform,
        @Inject( EnvVariables ) private environment: Environment // private pushService: PushService,
    ) {
        this.onDevice = this.platform.is( 'cordova' )
    }

    /**
     *
     *
     */
    public acessoCidadaoLogin = ( username: string, password: string ): Observable<User> => {
        let identity: AcessoCidadaoIdentity = {
            client_id: this.environment.identityServer.clients.espm.id,
            client_secret: this.environment.identityServer.clients.espm.secret,
            scope: this.environment.identityServer.defaultScopes,
            grant_type: 'password',
            username: username,
            password: password
        }

        return this.login( identity )
    }

    /**
     * Realiza o login usando o facebook
     * https://github.com/jeduan/cordova-plugin-facebook4
     *
     */
    public facebookLogin = (): Observable<User> => {
        // autentica no faceboook provider
        const request = fromPromise( this.facebook.login( [ 'email', 'public_profile' ] ) )

        return request.pipe( tap( this.saveFacebookAvatar ), map( this.createFacebookIdentity ), flatMap( this.login ) )
    }

    /**
     * Realiza o login usando conta do google
     *
     */
    public googleLogin = (): Observable<User> => {
        let options = {
            scopes: 'profile email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
            webClientId: this.environment.googleWebClientId, // optional clientId of your Web application from Credentials environment of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
            offline: true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        }

        // autentica no google provider
        const request = fromPromise( this.googlePlus.login( options ) )

        return request.pipe( tap( this.saveGoogleAvatar ), map( this.createGoogleIdentity ), flatMap( this.login ) )
    }

    /**
     *
     *
     */
    public logout() {
        // 1 - se desloga de todos os providers
        return Promise.all( [
            this.onDevice ? this.googlePlus.logout() : Promise.resolve(),
            this.onDevice ? this.facebook.logout() : Promise.resolve(),
            this.acessoCidadao.logout()
        ] )

        // 3 - Reinicia o push para usuário anônimo
        // todo this.pushService.init()
    }

    /**
     *
     *
     */
    public refreshAccessTokenIfNeeded = (): Observable<Token> => this.acessoCidadao.refreshAccessTokenIfNeeded()

    /**
     *
     *
     */
    public get isAuthenticated() {
        return this.acessoCidadao.isAuthenticated
    }

    /**
     *
     *
     */
    public get user(): User {
        return this.authStorage.getValue( 'user' )
    }

    /**
     *
     *
     */
    public get isAnonymous(): boolean {
        return this.user && this.user.anonymous
    }

    /**
     *
     *
     */
    public refreshUser = (): Observable<User> => {
        return this.acessoCidadao.getUserClaims().pipe( flatMap( this.createUser ) )
    }

    /************************************* Private API *************************************/

    /**
     *
     *
     */
    private login = ( identity: Identity ): Observable<User> => {
        return this.acessoCidadao.login( identity ).pipe( flatMap( this.createUser ) )

        // 5)
        // todo // this.pushService.init()
    }

    /**
     *
     *
     */
    private createUser = ( claims: AcessoCidadaoClaims ): Promise<User> => {
        const user = User.createFrom( claims )
        user.avatarUrl = this.authStorage.getValue( 'avatarUrl' ) || user.avatarUrl
        return this.authStorage.setValue( 'user', user )
    }

    /**
     *
     *
     */
    private saveAvatarUrl = ( avatarUrl: string ): Promise<string> => this.authStorage.setValue( 'avatarUrl', avatarUrl )

    /**
     *
     *
     */
    private createFacebookIdentity = ( authReponse: FacebookLoginResponse ): SocialNetworkIdentity => ( {
        client_id: this.environment.identityServer.clients.espmExternalLoginAndroid.id,
        client_secret: this.environment.identityServer.clients.espmExternalLoginAndroid.secret,
        grant_type: 'customloginexterno',
        scope: this.environment.identityServer.defaultScopes,
        provider: 'Facebook',
        accesstoken: authReponse.authResponse.accessToken
    } )

    /**
     *
     *
     */
    private createGoogleIdentity = ( authReponse: GoogleAuthResponse ): SocialNetworkIdentity => ( {
        client_id: this.environment.identityServer.clients.espmExternalLoginAndroid.id,
        client_secret: this.environment.identityServer.clients.espmExternalLoginAndroid.secret,
        grant_type: 'customloginexterno',
        scope: this.environment.identityServer.defaultScopes,
        provider: 'Google',
        accesstoken: authReponse.idToken
    } )

    /**
     *
     *
     */
    private saveFacebookAvatar = ( resp: FacebookLoginResponse ) =>
        this.saveAvatarUrl( `https://graph.facebook.com/v2.7/${ resp.authResponse.userID }/picture?type=normal` )

    /**
     *
     *
     */
    private saveGoogleAvatar = ( resp: GoogleAuthResponse ) => this.saveAvatarUrl( resp.imageUrl )
}
