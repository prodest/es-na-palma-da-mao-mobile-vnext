import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  concurso: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.inicializa();
  }

  async inicializa() {
    this.concurso = await this.navParams.data;
  }

  openLink(link) {
    window.open(link, '_system', 'location=yes');
  }
}
