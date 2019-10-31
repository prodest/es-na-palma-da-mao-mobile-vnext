import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage({
  segment: 'contracheque'
})
@Component({
  selector: 'paystub',
  templateUrl: 'paystub.html'
})
export class PaystubPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertController) {}

  profiles = [
    {
      perfilacesso: 'Servidor'
    },
    {
      perfilacesso: 'Pensionista'
    },
    {
      perfilacesso: 'Pensão Especial'
    }
  ];

  showDetails(profile: any): void {
    const alert = this.alert.create({
      title: profile.perfilacesso,
      subTitle: profile.perfilacesso,
      message: profile.perfilacesso,
      buttons: ['OK']
    });
    alert.present();
  }
}
