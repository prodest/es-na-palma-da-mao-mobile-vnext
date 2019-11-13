import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, /*AlertController*/ } from 'ionic-angular';

@IonicPage({
  segment: 'contracheque/perfis'
})
@Component({
  selector: 'paystub-profiles',
  templateUrl: 'paystub-profiles.html'
})
export class PaystubProfilesPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, /*private alert: AlertController*/) {}

  profiles = [
    {
      perfilacesso: 'Servidor', disable: false
    },
    {
      perfilacesso: 'Pensionista', disable: false
    },
    {
      perfilacesso: 'Pensão Especial', disable: false
    }
  ];

  // showDetails(profile: any): void {
  //   const alert = this.alert.create({
  //     title: profile.perfilacesso,
  //     subTitle: profile.perfilacesso,
  //     message: profile.perfilacesso,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  pushNext(tipe) {
    // this.service
    //   .getDebitsTipe(this.vehicle, tipe)
    //   .subscribe(
    //     debits =>
    //       this.navCtrl.push('VehicleDebitsPage', { tipe: tipe, vehicle: this.vehicle, plate: this.vehicle.plate, debits }),
    //     error => console.log(error)
    //   );
  }
}

