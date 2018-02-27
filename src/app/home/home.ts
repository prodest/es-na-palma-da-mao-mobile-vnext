import { Component, Inject } from '@angular/core'
import { AuthService } from '@espm/core/auth'
import { Environment, EnvVariables } from '@espm/core/environment'
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser'
import { IonicPage, NavController, Platform } from 'ionic-angular'

@IonicPage()
@Component( {
    selector: 'page-home',
    templateUrl: 'home.html'
} )
export class HomePage {
    /**
     * Creates an instance of HomePage.
     */
    constructor (
        private auth: AuthService,
        private navCtrl: NavController,
        private iab: InAppBrowser,
        private platform: Platform,
        @Inject( EnvVariables ) private environment: Environment
    ) { }

    /**
     * ref: https://github.com/ionic-team/ionic/issues/11459#issuecomment-365224107
     *
     */
    ionViewCanEnter(): boolean | Promise<any> {
        const isAllowed = !this.auth.isAuthenticated

        if ( !isAllowed ) {
            setTimeout( this.goToDashboardPage, 0 )
        }
        return isAllowed
    }

    /**
     *
     *
     */
    goToLoginPage = () => this.navCtrl.push( 'LoginPage' )

    /**
     *
     *
     */
    goToDashboardPage = () => this.navCtrl.setRoot( 'DashboardPage' )

    /**
     *
     *
     */
    createAccount = (): void => {
        let options = 'toolbar=no,location=no,clearcache=yes,clearsessioncache=yes,closebuttoncaption=Cancelar'
        let browser = this.iab.create(
            `${ this.environment.api.acessocidadao }/Conta/VerificarCPF?espmplatform=${ this.platform.platforms().join( ',' ) }`,
            '_blank',
            options
        )
        browser.on( 'loadstart' ).subscribe(( event: InAppBrowserEvent ) => {
            if ( event.url === this.environment.api.acessocidadao ) {
                browser.close()
            }
        } )
        browser.on( 'loaderror' ).subscribe(( event: InAppBrowserEvent ) => browser.close() )
    }
}
