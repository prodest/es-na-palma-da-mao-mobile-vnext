import { Component, OnDestroy } from '@angular/core';
import { AuthQuery } from '@espm/core';
import { AlertController, IonicPage, ModalController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Vehicle } from './../../model';
import { VehiclesService } from './../../providers';

@IonicPage({
  segment: 'detran/veiculos'
})
@Component({
  selector: 'page-vehicles',
  templateUrl: 'vehicles.html'
})
export class VehiclesPage implements OnDestroy {
  editing = false;
  vehicles$: Observable<Vehicle[]>;
  destroyed$ = new Subject();

  /**
   *
   *
   */
  constructor(
    private detran: VehiclesService,
    private authQuery: AuthQuery,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  /**
   * ref: https://github.com/ionic-team/ionic/issues/11459#issuecomment-365224107
   *
   */
  ionViewCanEnter(): boolean | Promise<any> {
    // permite acesso à tela se autenticados
    const isAllowed = this.authQuery.isLoggedIn;

    if (!isAllowed) {
      setTimeout(() => this.navCtrl.setRoot('DashboardPage'));
    }
    return isAllowed;
  }

  /**
   *
   *
   */
  ionViewWillLoad() {
    this.detran.ready.then(this.loadVehicles);
  }

  /**
   *
   *
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  /**
   *
   *
   */
  addVehicle = () => {
    let modal = this.modalCtrl.create('AddVehiclePage', null, {
      cssClass: 'pop-up-modal',
      enableBackdropDismiss: true
    });
    modal.onDidDismiss(this.saveVehicle);
    modal.present();
  };

  /**
   *
   *
   */
  confirmRemove = (vehicle: Vehicle) => {
    let alert = this.alertCtrl.create({
      title: 'Remover veículo',
      message: `Deseja mesmo remover o veículo com placa ${vehicle.plate.toUpperCase()}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Remover',
          handler: () => {
            return this.removeVehicle(vehicle);
          }
        }
      ]
    });
    alert.present();
  };

  /**
   *
   *
   */
  showTickets = (vehicle: Vehicle) => {
    this.detran
      .getTickets(vehicle)
      .subscribe(
        tickets => this.navCtrl.push('VehicleTicketsPage', { vehicle, plate: vehicle.plate, tickets: tickets }),
        error => console.log(error)
      );
  };

  /**
   *
   *
   */
  toggleEditMode = () => (this.editing = !this.editing);

  /**
   *
   *
   */
  private loadVehicles = () => {
    //  observa mundanças nos veículos
    this.vehicles$ = this.detran.vehicles$.takeUntil(this.destroyed$); // .subscribe(this.updateVehicles)

    // carregamento inicial
    this.detran.load().subscribe();
  };

  /**
   *
   *
   */
  private saveVehicle = (vehicle: Vehicle) => {
    vehicle && this.detran.add(vehicle).subscribe();
  };

  /**
   *
   *
   */
  private removeVehicle(vehicle: Vehicle) {
    this.editing && this.detran.remove(vehicle).subscribe();
  }
}
