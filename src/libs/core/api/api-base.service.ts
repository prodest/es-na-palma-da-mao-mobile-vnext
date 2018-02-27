import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { share } from 'rxjs/operators'

export type Params = { [ key: string ]: any }

@Injectable()
export class ApiBaseService<T extends { id: string | number }> {
    /**
     * Creates an instance of ApiBaseService.
     */
    constructor ( private http: HttpClient, protected api: string ) { }

    /**
     *
     *
     */
    save( model: T ): Observable<T> {
        return model.id ? this.update( model ) : this.create( model )
    }

    /**
     *
     *
     */
    create( model: T ): Observable<T> {
        return this.http.post<T>( this.api, model ).pipe( share() )
    }

    /**
     *
     *
     */
    update( model: T ): Observable<T> {
        return this.http.put<T>( this.endpoint( model.id ), model ).pipe( share() )
    }

    /**
     *
     *
     */
    delete( model: any ): Observable<T> {
        return this.http.delete<T>( this.endpoint( model.id ) ).pipe( share() )
    }

    /**
     *
     *
     */
    get( route: number | string, params?: Params ): Observable<T> {
        return this.http.get<T>( this.endpoint( route ), { params: this.toParams( params ) } ).pipe( share() )
    }

    /**
     *
     *
     */
    getAll( params?: Params ): Observable<T[]> {
        return this.http.get<T[]>( this.api, { params: this.toParams( params ) } ).pipe( share() )
    }

    /**
     *
     *
     */
    protected endpoint( route: number | string ): string {
        return !route ? this.api : `${ this.api }/${ route }`.trim()
    }

    /**
     *
     *
     */
    protected toParams( params: Params = {} ) {
        let httpParams = new HttpParams()
        Object.keys( params )
            .filter( key => params[ key ] != null )
            .forEach( key => ( httpParams = httpParams.append( key, params[ key ] ) ) )
        return httpParams
    }
}
