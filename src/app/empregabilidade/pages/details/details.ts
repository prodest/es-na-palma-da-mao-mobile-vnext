import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Concurso } from '../../dto/Concurso';
@IonicPage()
@Component({
  selector: 'espm-page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  concurso: Concurso;
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
