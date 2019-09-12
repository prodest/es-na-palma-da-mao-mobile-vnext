import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Vehicle, Debit, DebitPreview } from '../../model';
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
    { nome: 'Pagar Tudo', tipo: 'LICENCIAMENTOATUAL',disable: false},
    { nome: 'IPVA', tipo: 'IPVA' ,disable: false},
    { nome: 'DPVAT', tipo: 'DPVAT',disable: false },
    { nome: 'IPVA anterior', tipo: 'IPVAANTERIOR',disable: false },
    { nome: 'Licenciamento anterior', tipo: 'LICENCIAMENTOANTERIOR' ,disable: false},
    { nome: 'Multas', tipo: 'MULTA' ,disable: false},
    { nome: 'DPVAT anterior', tipo: 'DPVATANTERIOR' ,disable: false }
  ];
  preview: DebitPreview ; 
  /**
   *
   *
   */
  constructor(private navCtrl: NavController, 
              private params: NavParams, 
              private service: VehiclesService) { }

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
    this.preview = this.params.get('preview');
    console.log(this.preview);

    this.botoes[0].disable = this.preview.temLicenciamentoAtual;
    this.botoes[1].disable = this.preview.temIPVA;
    this.botoes[2].disable = this.preview.temDPVAT;
    this.botoes[3].disable = this.preview.temIPVAAnterior;
    this.botoes[4].disable = this.preview.temLicenciamentoAnterior;
    this.botoes[5].disable = this.preview.temMulta;
    this.botoes[6].disable = this.preview.temDPVATAnterior;
    
    
  }

  pushNext(tipe) {
    this.service
      .getDebitsTipe(this.vehicle, tipe)
      .subscribe(
        debits =>
          this.navCtrl.push('VehicleDebitsPage', { tipe: tipe, vehicle: this.vehicle, plate: this.vehicle.plate, debits }),
        error => console.log(error)
      );
  }
  /**
   * 
   */
  goBack(){
    this.navCtrl.pop();
  }

  
}
