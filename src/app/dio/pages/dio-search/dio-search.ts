import { Component, ViewChild } from '@angular/core';
import { ExpandableHeaderComponent } from '@espm/shared';
import { Content, IonicPage, Loading, LoadingController, ModalController, ToastController, NavController } from 'ionic-angular';
import { finalize } from 'rxjs/operators';

import { DioApiService } from '../../providers';
import { Hit, SearchFilter, SearchResult } from './../../model';

const defaultFilter = {
  pageNumber: 0,
  sort: 'date',
  query: '',
  dateMin: null,
  dateMax: null
};

@IonicPage({
  segment: 'dio/consulta'
})
@Component({
  selector: 'page-dio-search',
  templateUrl: 'dio-search.html'
})
export class DioSearchPage {
  @ViewChild(Content) content: Content;
  @ViewChild(ExpandableHeaderComponent) header: ExpandableHeaderComponent;
  private loading: Loading;
  searchResults: SearchResult;
  hits: Hit[] | undefined;
  searched = false;
  hasMoreHits = false;
  totalHits: number = 0;
  filter: SearchFilter = { ...defaultFilter };
  lastQuery = '';

  /**
   *
   *
   */
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private toastr: ToastController,
    private dio: DioApiService,
    private loadingCtrl: LoadingController
  ) { }

  /**
   *
   *
   */
  openFilter() {
    let filterModal = this.modalCtrl.create('DioSearchFilterPage', { filter: this.filter });
    filterModal.onDidDismiss(this.search);
    filterModal.present();
  }

  /**
   *
   *
   */
  search = (filter: Partial<SearchFilter>, infiniteScroll) => {
    this.filter = { ...defaultFilter, ...this.filter, ...filter };

    if (!this.filter.query) {
      this.toastr.create({ message: 'Escolha uma palavra-chave', duration: 3000, dismissOnPageChange: true }).present();
    } else if (!this.filter.dateMin) {
      this.toastr.create({ message: 'Escolha uma data inicial', duration: 3000, dismissOnPageChange: true }).present();
    } else if (!this.filter.dateMax) {
      this.toastr.create({ message: 'Escolha uma data final', duration: 3000, dismissOnPageChange: true }).present();
    } else {
      if (!infiniteScroll) {
        this.showLoading();
      }
      this.dio
        .search(this.filter)
        .pipe(
          finalize(() => {
            this.searched = true;
            this.dismissLoading();
            infiniteScroll && infiniteScroll.complete();
          })
        )
        .subscribe(this.onSearchSuccess);
    }
  };
  /**
   * 
   */
  editions = () => { this.navCtrl.push('LatestEditionsPage') }
  /**
   *
   *
   */
  clear = () => {
    if (this.hits && !this.hits.length) {
      this.searched = false;
    }
    this.filter = { ...defaultFilter };
  };

  /**
   *
   *
   */
  scrollToTop() {
    this.content.scrollToTop().then(() => this.content.resize());
  }

  /**
   *
   *
   */
  scrollTo(target: number): Promise<any> {
    return this.content.scrollTo(this.content.scrollLeft, target);
  }

  /**
   *
   *
   */
  private showLoading = () => {
    this.loading = this.loadingCtrl.create({ content: 'Aguarde', dismissOnPageChange: true });
    this.loading.present();
  };
  /**
   *
   *
   */
  private dismissLoading = () => {
    this.loading && this.loading.dismiss();
  };

  /**
   *
   *
   */
  private onSearchSuccess = (nextResults: SearchResult) => {
    if (this.filter.pageNumber === 0) {
      this.hits = [];
      this.scrollTo(this.header.height);
    }
    this.totalHits = nextResults.totalHits;
    this.hits = [...this.hits, ...nextResults.hits];
    this.hasMoreHits = nextResults.hits && nextResults.hits.length > 0;
    this.lastQuery = this.filter.query;
  };
  /**
   * 
   */
  back = () => { this.navCtrl.pop() }
}
