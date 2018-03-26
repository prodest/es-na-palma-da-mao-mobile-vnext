import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Ticket, Vehicle } from './../../model';
import { VehiclesService } from './../../providers';

@IonicPage({
  segment: 'detran/veiculos/:plate/multas'
})
@Component({
  selector: 'page-vehicle-tickets',
  templateUrl: 'vehicle-tickets.html'
})
export class VehicleTicketsPage {
  tickets$: Observable<Ticket[]>;
  vehicle: Vehicle;

  /**
   *
   *
   */
  constructor(private detran: VehiclesService, private navCtrl: NavController, private params: NavParams) {}

  /**
   * ref: https://github.com/ionic-team/ionic/issues/11459#issuecomment-365224107
   *
   */
  ionViewCanEnter(): boolean | Promise<any> {
    // permite acesso à tela de o usuário possui cnh no acesso cidadão ou cadastrou agora
    const isAllowed = !!this.params.get('vehicle');

    if (!isAllowed) {
      setTimeout(() => this.navCtrl.setRoot('VehiclesPage'));
    }
    return isAllowed;
  }

  /**
   *
   *
   */
  ionViewWillLoad() {
    this.vehicle = this.params.get('vehicle');
    this.detran.ready.then(this.loadTickets);
  }

  /**
   *
   *
   */
  private loadTickets = () => {
    this.tickets$ = this.detran.getTickets(this.vehicle);
  };
}
