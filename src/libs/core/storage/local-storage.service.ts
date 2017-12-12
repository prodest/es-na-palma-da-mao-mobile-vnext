import { Storage } from '@ionic/storage'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { distinctUntilChanged } from 'rxjs/operators'

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
export abstract class LocalStorage<T> {
    protected values$$: BehaviorSubject<Partial<T>>

    public get all$(): Observable<Partial<T>> {
        return this.values$$.asObservable().pipe( distinctUntilChanged() )
    }

    public get all(): Partial<T> {
        return this.values$$.getValue()
    }

    protected defaults: Partial<T>

    /**
     *
     *
     */
    constructor ( protected storage: Storage, defaults: any, private STORAGE_KEY: string = '_settings' ) {
        this.defaults = defaults
        this.values$$ = new BehaviorSubject<any>( this.defaults )
        this.load()
    }

    /**
     *
     *
     */
    public setValue = ( key: keyof T, value: any ) => this.merge( { [ key ]: value } as Partial<T> )

    /**
     *
     *
     */
    public getValue = <K extends keyof T>( key: K ) => this.all[ key ]

    /**
     *
     *
     */
    public setAll = ( values: Partial<T> ) => {
        this.storage.set( this.STORAGE_KEY, values ).then( this.refreshValues )
    }

    /**
     *
     *
     */
    public merge = ( values: Partial<T> ) => this.setAll( Object.assign( this.all, values ) )

    /**
     *
     *
     */
    public reset = () => this.setAll( this.defaults )

    /**
     *
     *
     */
    public clear = () => this.storage.remove( this.STORAGE_KEY ).then( this.refreshValues )

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
    private refreshValues = ( values: T ) => this.values$$.next( values )

    /**
     *
     *
     */
    private load = () => {
        return this.storage.get( this.STORAGE_KEY ).then( values => {
            let settings = Object.assign( {}, this.defaults )
            if ( values ) {
                settings = this.mergeDefaults( values, this.defaults )
            }
            this.setAll( settings )
        } )
    }
}
