import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  segment: 'contracheque/download'
})
@Component({
  selector: 'download-paystub',
  templateUrl: 'download-paystub.html'
})
export class DownloadPaystubPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

}

