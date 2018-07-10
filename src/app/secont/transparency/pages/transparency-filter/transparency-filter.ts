import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

import { DateRangeFilter, YearFilter } from './../../model';

@IonicPage()
@Component({
  selector: 'page-transparency-filter',
  templateUrl: 'transparency-filter.html'
})
export class TransparencyFilterPage {
  title: string;
  year: boolean;
  filter: YearFilter | DateRangeFilter;
  years: number[];

  /**
   *
   */
  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.years = [];
  }

  /**
   *
   */
  ionViewDidLoad() {
    if (this.navParams.data.filter) {
      this.title = this.navParams.data.title;
      this.year = this.navParams.data.year;
      this.filter = this.navParams.data.filter;
      if (this.filter instanceof YearFilter) {
        const now = moment();
        for (let i = now.year(); i > now.year() - 10; i--) {
          this.years.push(i);
        }
      }
    }
  }

  /**
   *
   */
  dismiss() {
    if (this.filter) {
      this.filter.updateFromISO();
      this.viewCtrl.dismiss(this.filter);
    }
  }
}
