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
  tipe: string;
  tipoFlag = {
    '0': { checked: false, disabled: false },
    '1': { checked: true, disabled: true },
    '2': { checked: true, disabled: false },
    '3': { checked: false, disabled: false }
  };
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
    // this.debits = this.params.get('debits');
    this.debits = this.tranforma_dados(this.params.get('debits'));
    this.tipe = this.params.get('tipe');
  }
  tranforma_dados(debitos: Debit[]) {
    if (typeof debitos[0] === 'string') {
      return [];
    }
    debitos.map(debito => {
      debito = this.testaFlags(debito);
      if (debito.parcela !== 0) {
        debito.flag.disabled = true;
      }
      return;
    });
    return debitos;
  }

  testaFlags(debito) {
    debito.flag = debito.flagDpvatAnterior > -1 ? this.geraFlag(debito.flagDpvatAnterior) : debito.flag;
    debito.flag = debito.flagDpvatExercicio > -1 ? this.geraFlag(debito.flagDpvatExercicio) : debito.flag;
    debito.flag = debito.flagIpvaAnterior > -1 ? this.geraFlag(debito.flagIpvaAnterior) : debito.flag;
    debito.flag = debito.flagIpvaExercicio > -1 ? this.geraFlag(debito.flagIpvaExercicio) : debito.flag;
    debito.flag = debito.flagLicenciamentoAnterior > -1 ? this.geraFlag(debito.flagLicenciamentoAnterior) : debito.flag;
    debito.flag = debito.flagLicenciamentoExercicio > -1 ? this.geraFlag(debito.flagLicenciamentoExercicio) : debito.flag;
    debito.flag = debito.flagIpvaParcelamento > -1 ? this.geraFlag(debito.flagIpvaParcelamento) : debito.flag;
    return debito;
  }
  geraFlag(flag) {
    return this.tipoFlag[flag];
  }
}
