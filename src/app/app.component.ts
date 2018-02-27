import { Component, ViewChild } from '@angular/core'
import { AuthService } from '@espm/core/auth'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { Nav, Platform } from 'ionic-angular'

const menus = [
    {
        name: 'Principal',
        items: [
            {
                title: 'Principal',
                icon: 'apps',
                component: 'HomePage',
                order: 1
            },
            {
                title: 'Detran CNH',
                icon: 'card',
                component: 'DriverLicensePage',
                order: 2
            },
            {
                title: 'Detran Veículos',
                icon: 'car',
                component: 'VehiclesPage',
                order: 2
            },
            {
                title: 'Agenda ES',
                icon: 'calendar',
                component: 'SchedulePage',
                order: 2
            },
            {
                title: 'Notícias',
                icon: 'paper',
                component: 'NewsPage',
                order: 3
            },
            {
                title: 'Consulta Processo',
                icon: 'search',
                component: 'SepPage',
                order: 4
            }
        ]
    }
]

@Component( {
    templateUrl: 'app.component.html'
} )
// tslint:disable-next-line:component-class-suffix
export class ESPM {
    @ViewChild( Nav ) nav: Nav
    public rootPage: any = 'HomePage'
    public menus = menus

    /**
     *
     */
    constructor (
        platform: Platform,
        private auth: AuthService,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen
    ) {
        platform
            .ready()
            .then( this.initialize )
            .catch( console.error )
    }

    /**
     *
     */
    public openPage = ( page: string ) => this.nav.setRoot( page )

    /**
     *
     */
    public logout = () => {
        this.auth.logout(() => {
            this.openPage( 'HomePage' )
        } )
    }

    /**
     *
     */
    private initialize = () => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.overlaysWebView( false )
        this.statusBar.backgroundColorByHexString( '#000' )
        this.splashScreen.hide()
    }
}
