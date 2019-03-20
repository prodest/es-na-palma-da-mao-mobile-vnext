import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Vehicle, Debit } from '../../model';
import { VehiclesService } from '../../providers';

@IonicPage({
  segment: 'detran/veiculos/:plate/debitos-tipo'
})
@Component({
  selector: 'page-vehicle-debits-tipe',
  templateUrl: 'vehicle-debits-tipe.html'
})
export class VehicleDebitsTipePage {
  debits: Debit[];
  vehicle: Vehicle;
  botoes = [
    {nome:'Licenciamento',tipo:'LICENCIAMENTOATUAL'},
    {nome:'IPVA',tipo:'IPVA'},
    {nome:'DPVAT',tipo:'DPVAT'},
    {nome:'IPVA anterior',tipo:'IPVAANTERIOR'},
    {nome:'Licenciamento anterior',tipo:'LICENCIAMENTOANTERIOR'},
    {nome:'DPVAT anterior',tipo:'DPVATANTERIOR'},
  ]
  /**
   *
   *
   */
  constructor(private navCtrl: NavController, private params: NavParams,private service: VehiclesService,) {}

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

  pushNext(tipe){

    this.service
    .getDebitsTipe(this.vehicle,tipe)
    .subscribe(
      debits => this.navCtrl.push('VehicleDebitsPage', {vehicle:this.vehicle, plate: this.vehicle.plate, debits }),
      error => console.log(error)
    );
  }
}
