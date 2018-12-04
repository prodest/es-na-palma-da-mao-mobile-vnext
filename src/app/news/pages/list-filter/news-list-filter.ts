import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Filter } from '../../model';

@IonicPage()
@Component({
  selector: 'page-news-list-filter',
  templateUrl: 'news-list-filter.html'
})
export class NewsListFilterPage {
  availableOrigins: string[];
  filter: Filter = {
    origins: []
  };

  /**
   *
   */
  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {}

  /**
   *
   */
  ionViewDidLoad() {
    if (this.navParams.data.filter) {
      this.filter = Object.assign(this.filter, this.navParams.data.filter);
    }
    if (this.navParams.data.origins) {
      this.availableOrigins = this.navParams.data.origins;
    }
  }

  /**
   *
   */
  dismiss() {
    this.viewCtrl.dismiss(this.filter);
  }

  /**
   *
   *
   */
  isAllChecked() {
    return this.filter.origins.length !== 0 && this.filter.origins.length === this.availableOrigins.length;
  }

  /**
   *
   */
  toggleAllChecked() {
    if (this.isAllChecked()) {
      this.filter.origins = [];
    } else if (this.filter.origins.length === 0 || this.filter.origins.length > 0) {
      this.filter.origins = this.availableOrigins.slice(0);
    }
  }

  /**
   *
   *
   */
  toggleChecked(origin) {
    let idx = this.filter.origins.indexOf(origin);
    if (idx > -1) {
      this.filter.origins.splice(idx, 1);
    } else {
      this.filter.origins.push(origin);
    }
  }

  /**
   *
   *
   */
  isSelected(origin) {
    return this.filter.origins.indexOf(origin) > -1;
  }
}
