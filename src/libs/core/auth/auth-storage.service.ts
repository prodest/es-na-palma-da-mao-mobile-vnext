import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'

import { LocalStorage } from './../storage/local-storage.service'
import { AuthStorageModel } from './auth-storage.model'
import { User } from './models/index'
import { Token } from './models/token'

/**
 * Serviço que trata local storage no contexto da autenticação
 *
 */
@Injectable()
export class AuthStorage extends LocalStorage<AuthStorageModel> {
    /**
     * Creates an instance of AuthenticationStorageService.
     *
     */
    constructor ( storage: Storage, defaults: any, storageKey: string ) {
        super( storage, defaults, storageKey )
    }

    /**
     *
     *
     */
    public get user(): User {
        return this.getValue( 'user' )
    }

    /**
     *
     *
     */
    public set user( user: User ) {
        this.setValue( 'user', user )
    }

    /************************************** Acesso Cidadão **************************************/

    /**
     *
     *
     */
    public get accessToken(): Token {
        return this.getValue( 'accessToken' )
    }

    /**
     *
     *
     */
    public set accessToken( token: Token ) {
        this.setValue( 'accessToken', token )
    }

    /**
     *
     *
     */
    public get refreshToken(): any {
        return this.getValue( 'refreshToken' )
    }

    /**
     *
     *
     */
    public set refreshToken( token: any ) {
        this.setValue( 'refreshToken', token )
    }

    /**
     *
     *
     */
    public get clientId(): any {
        return this.getValue( 'clientId' )
    }

    /**
     *
     *
     */
    public set clientId( clientId: any ) {
        this.setValue( 'clientId', clientId )
    }

    /**
     *
     *
     */
    public get avatarUrl(): string {
        return this.getValue( 'avatarUrl' )
    }

    /**
     *
     *
     */
    public set avatarUrl( avatarUrl: string ) {
        this.setValue( 'avatarUrl', avatarUrl )
    }
}
