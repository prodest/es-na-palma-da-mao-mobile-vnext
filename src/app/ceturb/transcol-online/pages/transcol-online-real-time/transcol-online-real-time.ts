import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { take } from 'rxjs/operators';

import { VehiclesQuery, Vehicle, VehiclesService, BusStopsQuery, BusStopsService } from '../../state';


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
  nearestStopSubscription: Subscription;
  deviceCoordinates$: Observable<Geoposition>;
  vehiclesAutoReloader: NodeJS.Timer;
  stopsAutoReloader: NodeJS.Timer;
  loadingVehicles$: Observable<boolean>;
  loadingVehiclesSubscription: Subscription;
  loader: Loading;

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
      this.loadingVehicles$ = this.vehiclesQuery.selectLoading();
      this.createLoading();
  }

  ionViewWillLoad() {
    this.nearestStopSubscription = this.nearestStop$
    .subscribe(
      stopId => this.vehiclesService.updateVehicles(stopId)
    );
    this.loadingVehiclesSubscription = this.loadingVehicles$
    .subscribe((loading: boolean) => {
        loading ? this.loader.present() : this.loader.dismiss();
    });
  }

  ionViewDidLoad() {
    this.startAutoReload();
  }

  ionViewWillLeave() {
    this.stopAutoReload();
    this.loadingVehiclesSubscription.unsubscribe();
    this.nearestStopSubscription.unsubscribe();
  }
  
  createLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.onDidDismiss(() => {
      this.createLoading();
    });
  }

  private getDeviceCoordinates(): Observable<Geoposition> {
    return this.geolocation.watchPosition().pipe(take(1));
  }

  updateVehicles() {
    this.vehiclesService.updateVehicles(this.busStopsQuery.getActiveId() as number);
  }

  startAutoReload() {
    this.vehiclesAutoReloader = setInterval(() => {
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
    clearInterval(this.vehiclesAutoReloader);
    clearInterval(this.stopsAutoReloader);
    console.log("Auto reload stopped.");
  }

}
