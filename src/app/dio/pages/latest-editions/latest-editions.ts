import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Edition } from './../../model';
import { DioService } from './../../providers/dio.service';

@IonicPage({
  segment: 'dio/edicoes-recentes'
})
@Component({
  selector: 'latest-editions',
  templateUrl: 'latest-editions.html',
  providers: [DioService]
})
export class LatestEditionsPage {
  editing = false;
  latestEditions$: Observable<Edition[]>;
  /**
   *
   *
   */
  constructor(private dio: DioService) {}
  /**
   *
   *
   */
  ionViewWillLoad() {
    this.latestEditions$ = this.dio.getLatestEditions();
  }

  openEdition(url) {
    window.open(url, '_system');
  }
}
