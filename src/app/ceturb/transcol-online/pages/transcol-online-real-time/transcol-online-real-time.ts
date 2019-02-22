import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, AlertOptions, Alert } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { take, map } from 'rxjs/operators';

import { VehiclesQuery, Vehicle, VehiclesService, BusStopsQuery, BusStopsService, BusStop } from '../../state';
import { ApiCeturbV2Service } from '../../providers';
import { interval } from 'rxjs/observable/interval';

const CINCO_MINUTOS = 5*60*1000;

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
  nearestStop$: Observable<BusStop>;
  nearestStopId$: Observable<number>;
  nearestStopSubscription: Subscription;
  deviceCoordinates$: Observable<Geoposition>;
  expectedVehiclesAutoReloader: Subscription;
  stopsAutoReloader: Subscription;
  loadingVehicles$: Observable<boolean>;
  loadingVehiclesSubscription: Subscription;
  loader: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    private vehiclesQuery: VehiclesQuery,
    private vehiclesService: VehiclesService,
    private busStopsQuery: BusStopsQuery,
    private busStopsService: BusStopsService,
    private apiCeturbV2Service: ApiCeturbV2Service
  ) {
    this.updateExpectedVehicles();
    this.deviceCoordinates$ = this.getDeviceCoordinates();
    this.nearestStop$ = this.busStopsQuery.selectActive().pipe(map(stop => stop === undefined ? {} as BusStop : stop));
    this.nearestStopId$ = this.busStopsQuery.selectActiveId() as Observable<number>;
    this.loadingVehicles$ = this.vehiclesQuery.selectLoading();
    this.createLoading();
  }

  ionViewWillLoad() {
    // verifica se o gps está ativado, se não estiver, avisa ao usuário
    this.deviceCoordinates$.subscribe(response => {
      if (response['code']) this.createMissingLocationAlert().present()
    });

    // quando o ponto mais próximo muda, atualizamos a Store com a nova referência
    this.nearestStopSubscription = this.nearestStopId$.subscribe(
      (stopId: number) => this.vehiclesService.updateVehicles(stopId, {autoReloadInterval: 30})
    );

    // condiciona a exibição do Loader ao loading da VehiclesStore
    this.loadingVehiclesSubscription = this.loadingVehicles$.subscribe(
      (loading: boolean) => loading ? this.loader.present() : this.loader.dismiss()
    );

    // somente veículos que aparecem nas estimativas dos próximos 20 minutos (expectedVehicles) são exibidos ao usuário
    this.vehicles$ = this.vehiclesQuery.selectAll({
      filterBy: (vehicle: Vehicle) => {
        return ( 
          this.expectedVehicles.includes(vehicle.rotulo.toString()) && 
          Date.now() - vehicle.datahora < CINCO_MINUTOS
        );
      }
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
   * Cria um alert.
   */
  private createMissingLocationAlert(): Alert {
    return this.alertCtrl.create({
      header: 'Localização desativada',
      message: 'Para usar esta funcionalidade, ative a localização do seu dispositivo',
      buttons: [
        {
          text:'Entendi',
          handler: () => {
            this.navCtrl.pop()
          }
        }
      ]
    } as AlertOptions);
  }

  /**
   * Obtém as coordenadas (lat, lon) do dispositivo.
   */
  private getDeviceCoordinates(): Observable<Geoposition> {
    return this.geolocation.watchPosition().pipe(take(1));
  }

  /**
   * Atualiza conjunto de veículos presentes nas estimativas dos próximos 20 minutos.
   */
  private updateExpectedVehicles() {
    const interval = 20; // minutos
    const stop = this.busStopsQuery.getActiveId() as number;

    this.expectedVehicles = [];
    this.apiCeturbV2Service.previsionsByStopOnInterval(stop, interval).subscribe(
      {
        next: (previsions: Array<any>) => {
          previsions.map(prevision => {
            this.expectedVehicles.push(prevision['veiculo'])
          });
        },
        error: error => console.error("ERROR", error)        
      }
    );
  }

  /**
   * Inicia o reload automatizado
   */
  startAutoReload() {
    // a cada 30 segundos atualiza os veículos esperados
    this.expectedVehiclesAutoReloader = interval(30 * 1000).subscribe(() => this.updateExpectedVehicles());

    // a cada 5 minutos atualiza os pontos de ônibus
    this.stopsAutoReloader = interval(300 * 1000).subscribe(() => this.deviceCoordinates$.subscribe(
      response => response['code'] ? null : this.busStopsService.updateStops(response)
    ));
  }

  /**
   * Finaliza o reload automatizado.
   */
  stopAutoReload() {
    this.stopsAutoReloader.unsubscribe(); // desativa o autoload criado em startAutoLoad()
    this.expectedVehiclesAutoReloader.unsubscribe(); // desativa o autoload criado em startAutoload()
  }

}
