import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { VehiclesQuery, Vehicle, VehiclesService, BusStopsQuery, BusStopsService } from '../../state';
import { Observable } from 'rxjs/Observable';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { take } from 'rxjs/operators';


/**
 * Generated class for the TranscolOnlineRealTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transcol-online-real-time',
  templateUrl: 'transcol-online-real-time.html'
})
export class TranscolOnlineRealTimePage {
  vehicles$: Observable<Vehicle[]>;
  nearestStop$: Observable<number>;
  deviceCoordinates$: Observable<Geoposition>;
  vehiclesAutoreloader: NodeJS.Timer;
  stopsAutoReloader: NodeJS.Timer;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private vehiclesQuery: VehiclesQuery,
    private vehiclesService: VehiclesService,
    private busStopsQuery: BusStopsQuery,
    private busStopsService: BusStopsService
    ) {
      this.deviceCoordinates$ = this.getDeviceCoordinates();
      this.nearestStop$ = this.busStopsQuery.selectActiveId() as Observable<number>;
      console.log("ponto mais próximo: ", this.busStopsQuery.getActiveId());
      this.vehicles$ = this.vehiclesQuery.selectAll();
  }

  ionViewWillLoad() {
    const loader = this.presentLoading();
    this.nearestStop$.subscribe(
      stopId => this.vehiclesService.updateVehicles(stopId)
    );
    loader.dismiss();
  }

  ionViewDidLoad() {
    this.startAutoReload();
  }

  ionViewWillLeave() {
    this.stopAutoReload();
  }
  
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

  private getDeviceCoordinates(): Observable<Geoposition> {
    return this.geolocation.watchPosition().pipe(take(1));
  }

  updateVehicles() {
    this.vehiclesService.updateVehicles(this.busStopsQuery.getActiveId() as number);
  }

  startAutoReload() {
    this.vehiclesAutoreloader = setInterval(() => {
      console.log("reloading vehicles");
      this.updateVehicles();
    }, 15 * 1000);

    this.stopsAutoReloader = setInterval(() => {
      this.deviceCoordinates$.subscribe(
        (coords) => {
          console.log("reloading stops");
          this.busStopsService.updateStops(coords);
        }
      );
    }, 300 * 1000);
  }

  stopAutoReload() {
    clearInterval(this.vehiclesAutoreloader);
    clearInterval(this.stopsAutoReloader);
    console.log("Auto reload stopped.");
  }

}
