import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { finalize } from 'rxjs/operators';

import { DioService } from '../../providers/dio.service';
import { Hit, SearchFilter, SearchResult } from './../../model';

@IonicPage({
  segment: 'dio/consulta'
})
@Component({
  selector: 'page-dio-search',
  templateUrl: 'dio-search.html',
  providers: [SocialSharing]
})
export class DioSearchPage {
  searchResults: SearchResult;
  hits: Hit[] | undefined;
  searched = false;
  hasMoreHits = false;
  totalHits: number = 0;
  filter: SearchFilter = {
    pageNumber: 0,
    sort: 'date'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public socialSharing: SocialSharing,
    public dio: DioService
  ) {}

  openFilter() {
    console.log(this.filter);
    let filterModal = this.modalCtrl.create('DioSearchFilterPage', { filter: this.filter });
    filterModal.onDidDismiss(this.search);
    filterModal.present();
  }

  search = (filter: SearchFilter) => {
    if (filter) {
      Object.assign(this.filter, filter || {});

      this.dio
        .search(this.filter)
        .pipe(finalize(() => (this.searched = true)))
        .subscribe(searchResults => this.onSearchSuccess(searchResults));
    }
  };

  /**
   *
   *
   * @param {string} link
   *
   * @memberOf NewsDetailController
   */
  share(hit: Hit): void {
    this.socialSharing.shareWithOptions({
      message: `DIO ES - ${hit.date} - Pág. ${hit.pageNumber}`,
      subject: `DIO ES - ${hit.date} - Pág. ${hit.pageNumber}`,
      url: hit.pageUrl
    });
  }

  /**
   *
   *
   * @param {string} url
   */
  open(url: string): void {
    window.open(url, '_system');
  }

  /**
   *
   *
   * @private
   * @param {SearchResult} nextResults
   * @returns
   *
   * @memberOf SearchController
   */
  private onSearchSuccess(nextResults: SearchResult) {
    if (this.filter.pageNumber === 0) {
      this.hits = [];
    }
    this.totalHits = nextResults.totalHits;
    this.hits = this.hits.concat(nextResults.hits);
    this.hasMoreHits = nextResults.hits && nextResults.hits.length > 0;
  }
}
