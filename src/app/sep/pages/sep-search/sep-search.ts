import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SepSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sep-search',
  templateUrl: 'sep-search.html'
})
export class SepSearchPage {
  processNumberModel: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SepSearchPage');
  }

  onInput(event) {
    console.log(event);
    console.log(this.processNumberModel);
  }

  onCancel(event) {
    console.log(event);
    console.log(this.processNumberModel);
  }
}
