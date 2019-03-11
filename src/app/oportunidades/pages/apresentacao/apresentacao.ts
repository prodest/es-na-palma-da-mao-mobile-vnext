import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'apresentacao',
  templateUrl: 'apresentacao.html',
})
export class Apresentacao {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  open() {
    this.navCtrl.push('ConcursosPage');
  }
}