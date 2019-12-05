import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  segment: 'contracheque'
})
@Component({
  selector: 'paystub',
  templateUrl: 'paystub.html'
})
export class PaystubPage {

  activeComponent: 'profile' | 'links' | 'download' = 'download'
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

}
