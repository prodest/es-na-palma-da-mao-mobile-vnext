import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Edition } from './../../model';
import { DioApiService } from './../../providers';

@IonicPage({
  segment: 'dio/edicoes-recentes'
})
@Component({
  selector: 'latest-editions',
  templateUrl: 'latest-editions.html'
})
export class LatestEditionsPage {
  editing = false;
  latestEditions$: Observable<Edition[]>;

  /**
   *
   *
   */
  constructor(
              private dio: DioApiService,
              public navCtrl: NavController) {}

  /**
   *
   *
   */
  ionViewWillLoad() {
    this.latestEditions$ = this.dio.getLatestEditions();
  }

  /**
   *
   *
   */
  openEdition(url) {
    window.open(url, '_system');
  }
  /**
   * 
   */
  back = () =>{this.navCtrl.pop()};
}
