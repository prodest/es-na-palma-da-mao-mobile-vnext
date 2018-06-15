import { Component, Inject } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { tap } from 'rxjs/operators';

import { NewsApiService } from '../../providers/news-api.service';
import { Filter, News, Pagination } from './../../model';

@IonicPage({
  segment: 'noticias'
})
@Component({
  selector: 'page-news-list',
  templateUrl: 'news-list.html',
  providers: [NewsApiService]
})
export class NewsListPage {
  public availableOrigins: string[] | undefined;
  public news: News[];
  public hasMoreNews = true;
  public filter: Filter = {};
  public pagination: Pagination = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public newsApiService: NewsApiService,
    @Inject(EnvVariables) private env: Environment
  ) {}

  /**
   *
   *
   */
  ionViewWillEnter() {
    this.getAvailableOrigins().then(() => this.getFirstPage(this.filter));
  }

  /**
   *
   *
   */
  get isFirstPage() {
    return this.pagination.pageNumber === 1;
  }

  /**
   *
   *
   */
  getAvailableOrigins() {
    return this.newsApiService.getAvailableOrigins().then((origins: string[]) => {
      this.availableOrigins = origins;
      this.filter.origins = this.filter.origins || [].concat(this.availableOrigins);
    });
  }

  /**
   * @memberOf NewsListController
   */
  doPaginate(infiniteScroll) {
    this.pagination.pageNumber += 1;
    this.getNews(this.filter, this.pagination)
      .pipe(tap(() => infiniteScroll.complete()))
      .subscribe(this.udpateNews);
  }

  /**
   * Abre filtro(modal) por fonte da notícia
   */
  openFilter() {
    let filterModal = this.modalCtrl.create('NewsListFilterPage', { filter: this.filter, origins: this.availableOrigins });
    filterModal.onDidDismiss(this.filterNews);
    filterModal.present();
  }

  /**
   * Navega para um notícia
   *
   */
  goToNews(id: string) {
    this.navCtrl.push('NewsDetailsPage', { id });
  }

  /**
   *
   */
  private getFirstPage(filter: Filter) {
    this.hasMoreNews = true;
    this.pagination.pageNumber = 1;
    this.getNews(this.filter, this.pagination)
      .pipe(tap(nextNews => (this.news = [])))
      .subscribe(this.udpateNews);
  }

  /**
   * Obtém uma lista de notícias
   */
  private getNews(filter: Filter, pagination: Pagination) {
    if (!this.pagination.pageSize) {
      this.pagination.pageSize = this.env.pagination.pageSize;
    }
    if (!this.pagination.pageNumber) {
      this.pagination.pageNumber = this.env.pagination.pageNumber;
    }

    return this.newsApiService.getNews(filter, pagination);
  }

  /**
   * Verifica se existem mais registros e configuração a paginação da classe
   * @param nextNews
   */
  private udpateNews = (nextNews: News[]) => {
    // Check whether it has reached the end
    this.hasMoreNews = nextNews.length >= this.pagination.pageSize;
    return (this.news = [...(this.news || []), ...nextNews]);
  };

  /**
   *
   */
  private filterNews = filter => {
    if (filter) {
      Object.assign(this.filter, filter);
      this.getFirstPage(this.filter);
    }
  };
}
