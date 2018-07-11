import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { SearchFilter } from './../../model';

@IonicPage()
@Component({
  selector: 'page-dio-search-filter',
  templateUrl: 'dio-search-filter.html'
})
export class DioSearchFilterPage {
  filter: SearchFilter;

  /**
   *
   */
  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.filter = {
      query: '',
      dateMin: null,
      dateMax: null,
      pageNumber: 1,
      sort: ''
    };
  }

  /**
   *
   */
  ionViewDidLoad() {
    this.filter = { ...this.filter, ...(this.navParams.get('filter') || {}) };
  }

  /**
   *
   */
  dismiss() {
    if (this.filter.query) {
      this.viewCtrl.dismiss(this.filter);
    }
  }
}
