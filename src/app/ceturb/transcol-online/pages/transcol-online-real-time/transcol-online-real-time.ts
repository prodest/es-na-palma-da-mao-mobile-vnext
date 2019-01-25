import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { VehiclesQuery, Vehicle, VehiclesService } from '../../state';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the TranscolOnlineRealTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transcol-online-real-time',
  templateUrl: 'transcol-online-real-time.html',
  providers: [
    VehiclesQuery
  ]
})
export class TranscolOnlineRealTimePage {
  vehicles$: Observable<Vehicle[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private vehiclesQuery: VehiclesQuery,
    private vehiclesService: VehiclesService
    ) {

  }

  ionViewWillLoad() {
    const loader = this.presentLoading();
    this.nearVehicles();
    loader.dismiss();
  }
  
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

  nearVehicles() {
    this.vehicles$ = this.vehiclesQuery.selectAll();
  }

}
