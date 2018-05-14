import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { SearchFilter } from './../../model';

/**
 * Generated class for the DioSearchFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dio-search-filter',
  templateUrl: 'dio-search-filter.html'
})
export class DioSearchFilterPage {
  filter: SearchFilter;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.filter = {
      query: '',
      dateMin: new Date().toISOString(),
      dateMax: new Date().toISOString(),
      pageNumber: 1,
      sort: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DioSearchFilterPage');
    if (this.navParams.data.filter) {
      this.filter = Object.assign(this.filter, this.navParams.data.filter);
    }
  }

  dismiss() {
    this.viewCtrl.dismiss(this.filter);
  }
}
