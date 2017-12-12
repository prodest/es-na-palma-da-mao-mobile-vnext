import { Directive, OnDestroy } from '@angular/core'
import { MenuController, ViewController } from 'ionic-angular'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'

@Directive( {
    selector: '[no-menu]' // Attribute selector
} )
export class NoMenuDirective implements OnDestroy {
    private destroyed$ = new Subject<boolean>()

    /**
     *
     *
     */
    constructor ( private menuCtrl: MenuController, private viewCtrl: ViewController ) {
        this.viewCtrl.willEnter.pipe( takeUntil( this.destroyed$ ) ).subscribe( this.disableMenu )
        this.viewCtrl.willLeave.pipe( takeUntil( this.destroyed$ ) ).subscribe( this.enableMenu )
    }

    /**
     *
     */
    private disableMenu = () => this.menuCtrl.enable( false )

    /**
     *
     *
     */
    private enableMenu = () => this.menuCtrl.enable( true )

    /**
     *
     *
     */
    public ngOnDestroy(): void {
        this.destroyed$.next( true )
        this.destroyed$.unsubscribe()
    }
}
