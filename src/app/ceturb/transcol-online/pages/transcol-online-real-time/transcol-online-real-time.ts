import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { take } from 'rxjs/operators';

import { VehiclesQuery, Vehicle, VehiclesService, BusStopsQuery, BusStopsService } from '../../state';
import { ApiCeturbV2Service } from '../../providers';


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
  expectedVehicles: string[] = [];
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
    private busStopsService: BusStopsService,
    private apiCeturbV2Service: ApiCeturbV2Service
  ) {
    this.updateExpectedVehicles();
    this.deviceCoordinates$ = this.getDeviceCoordinates();
    this.nearestStop$ = this.busStopsQuery.selectActiveId() as Observable<number>;
    this.loadingVehicles$ = this.vehiclesQuery.selectLoading();
    this.createLoading();
  }

  ionViewWillLoad() {
    // quando o ponto mais próximo muda, atualizamos a Store com a nova referência
    this.nearestStopSubscription = this.nearestStop$.subscribe(
      (stopId: number) => this.vehiclesService.updateVehicles(stopId)
    );

    // condiciona a exibição do Loader ao loading da VehiclesStore
    this.loadingVehiclesSubscription = this.loadingVehicles$.subscribe(
      (loading: boolean) => loading ? this.loader.present() : this.loader.dismiss()
    );

    // somente veículos que aparecem nas estimativas dos próximos 20 minutos (expectedVehicles) são exibidos ao usuário
    this.vehicles$ = this.vehiclesQuery.selectAll({
      filterBy: (vehicle: Vehicle) => (this.expectedVehicles.includes(vehicle.rotulo.toString()))
    });
  }

  ionViewDidLoad() {
    this.startAutoReload();
  }

  ionViewWillLeave() {
    this.stopAutoReload();
    this.nearestStopSubscription.unsubscribe();
  }
  
  /**
   * Cria um Loader.
   */
  private createLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.onDidDismiss(() => {
      this.loadingVehiclesSubscription.unsubscribe();
    });
  }

  /**
   * Obtém as coordenadas (lat, lon) do dispositivo.
   */
  private getDeviceCoordinates(): Observable<Geoposition> {
    return this.geolocation.watchPosition().pipe(take(1));
  }

  /**
   * Atualiza os veículos esperados e a Store.
   */
  private updateVehicles() {
    this.updateExpectedVehicles();
    this.vehiclesService.updateVehicles(this.busStopsQuery.getActiveId() as number);
  }

  /**
   * Atualiza conjunto de veículos presentes nas estimativas dos próximos 20 minutos.
   */
  private updateExpectedVehicles() {
    const interval = 20; // minutos

    this.expectedVehicles = [];
    this.apiCeturbV2Service.previsionsByStopOnInterval(this.busStopsQuery.getActiveId() as number, interval).subscribe((previsions: Array<any>) => {
      // console.log("Previsões em 20 minutos", previsions);
      previsions.map(prevision => {
        this.expectedVehicles.push(prevision['veiculo'])
      });
    });
  }

  /**
   * Inicia o reload automatizado
   */
  startAutoReload() {
    this.vehiclesAutoReloader = setInterval(() => {
      // console.log("Atualizando veículos");
      this.updateVehicles();
    }, 30 * 1000); // 30 segundos

    this.stopsAutoReloader = setInterval(() => {
      this.deviceCoordinates$.subscribe(
        (coords) => {
          // console.log("Atualizando pontos.");
          this.busStopsService.updateStops(coords);
        }
      );
    }, 300 * 1000); // 5 minutos
  }

  /**
   * Finaliza o reload automatizado.
   */
  stopAutoReload() {
    clearInterval(this.vehiclesAutoReloader);
    clearInterval(this.stopsAutoReloader);
    // console.log("Auto reload stopped.");
  }

}
