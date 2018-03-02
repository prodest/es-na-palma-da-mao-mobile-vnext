import { Storage } from '@ionic/storage'
import merge from 'lodash-es/merge'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { distinctUntilChanged } from 'rxjs/operators'

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
export abstract class LocalStorage<T> {
    protected values$$: BehaviorSubject<Partial<T>>
    protected defaults: Partial<T>

    public ready: Promise<T>

    public get all$(): Observable<Partial<T>> {
        return this.values$$.asObservable().pipe( distinctUntilChanged() )
    }

    public get all(): Partial<T> {
        return this.values$$.getValue()
    }

    /**
     *
     *
     */
    constructor ( protected storage: Storage, defaults: any, private STORAGE_KEY: string = '_settings' ) {
        this.defaults = defaults
        this.values$$ = new BehaviorSubject<any>( this.defaults )
        this.ready = this.load()
        this.ready.then( values => console.log( `Carregou ${ STORAGE_KEY }:`, values ) )
    }

    /**
     *
     *
     */
    public setValue = <K extends keyof T>( key: K, value: T[ K ] ): Promise<T[ K ]> => {
        return this.merge( { [ key as string ]: value } as any ).then(( o: T ) => o[ key ] )
    }

    /**
     *
     *
     */
    public mergeValue = <K extends keyof T>( key: K, value: T[ K ] ): Promise<T[ K ]> => {
        const allCopy = merge( {}, this.all )
        allCopy[ key ] = value
        return this.setAll( allCopy ).then(( o: T ) => o[ key ] )
    }

    /**
     *
     *
     */
    public getValue = <K extends keyof T>( key: K ) => this.all[ key ]

    /**
     *
     *
     */
    public reset = (): Promise<T> => this.setAll( this.defaults )

    /**
     *
     *
     */
    public clear = (): Promise<void> =>
        this.storage
            .remove( this.STORAGE_KEY )
            .then( this.refreshValues )
            .then(() => { } )

    /**
     *
     *
     */
    private setAll = ( values: Partial<T> ): Promise<T> =>
        this.storage.set( this.STORAGE_KEY, values ).then( this.refreshValues )

    /**
     *
     *
     */
    private merge = ( values: Partial<T> ): Promise<T> => this.setAll( merge( {}, this.all, values ) )

    /**
     *
     *
     */
    private mergeDefaults( settings: Partial<T>, defaults: Partial<T> ) {
        for ( let k in defaults ) {
            if ( !( k in settings ) ) {
                settings[ k ] = defaults[ k ]
            }
        }
        return settings
    }

    /**
     *
     *
     */
    private refreshValues = ( values: T ): T => {
        this.values$$.next( values )
        return values
    }

    /**
     *
     *
     */
    private load = (): Promise<T> => {
        return this.storage.get( this.STORAGE_KEY ).then( values => {
            let settings = merge( {}, this.defaults )
            if ( values ) {
                settings = this.mergeDefaults( values, this.defaults )
            }
            return this.setAll( settings )
        } )
    }
}
