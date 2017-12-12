import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

@IonicPage()
@Component( {
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
} )
export class DashboardPage {
    constructor ( public navCtrl: NavController, public navParams: NavParams ) { }

    ionViewDidLoad() {
        console.log( 'ionViewDidLoad DashboardPage' )
    }
}
