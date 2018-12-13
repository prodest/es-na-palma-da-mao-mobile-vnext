import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Vehicle, Debit } from '../../model';

@IonicPage({
  segment: 'detran/veiculos/:plate/debitos'
})
@Component({
  selector: 'page-vehicle-debits',
  templateUrl: 'vehicle-debits.html'
})
export class VehicleDebitsPage {
  debits: Debit[];
  vehicle: Vehicle;

  /**
   *
   *
   */
  constructor(private navCtrl: NavController, private params: NavParams) {}

  /**
   * ref: https://github.com/ionic-team/ionic/issues/11459#issuecomment-365224107
   *
   */
  ionViewCanEnter(): boolean | Promise<any> {
    // permite acesso à tela se o usuário possui cnh no acesso cidadão ou cadastrou agora
    const isAllowed = !!this.params.get('vehicle');

    if (!isAllowed) {
      setTimeout(() => this.navCtrl.push('VehiclesPage'));
    }
    return isAllowed;
  }

  /**
   *
   *
   */
  ionViewWillLoad() {
    this.vehicle = this.params.get('vehicle');
    this.debits = this.params.get('debits');
  }
}
