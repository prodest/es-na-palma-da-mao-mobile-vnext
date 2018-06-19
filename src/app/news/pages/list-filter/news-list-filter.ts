import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Filter } from '../../model';

/**
 * Generated class for the NewsListFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-list-filter',
  templateUrl: 'news-list-filter.html'
})
export class NewsListFilterPage {
  availableOrigins: string[];
  filter: Filter;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.filter = {
      origins: []
    };
  }

  ionViewDidLoad() {
    if (this.navParams.data.filter) {
      this.filter = Object.assign(this.filter, this.navParams.data.filter);
    }
    if (this.navParams.data.origins) {
      this.availableOrigins = this.navParams.data.origins;
    }
  }

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
  public toggleChecked(origin) {
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
  public isSelected(origin) {
    return this.filter.origins.indexOf(origin) > -1;
  }
}
