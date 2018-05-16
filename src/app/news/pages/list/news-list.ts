import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Environment, EnvVariables } from '@espm/core';
import { Filter, News, Pagination } from './../../model';
import { NewsApiService } from '../../providers/news-api.service';
import { tap } from 'rxjs/operators';

/**
 * Generated class for the NewsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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

  ionViewWillEnter() {
    console.log('ionViewDidLoad NewsListPage');
    this.getAvailableOrigins().then(() => this.getFirstPage(this.filter));
  }

  /**
   *
   *
   * @readonly
   *
   * @memberOf NewsListController
   */
  get isFirstPage() {
    return this.pagination.pageNumber === 1;
  }

  /**
   * Carrega lista de origins disponíveis
   *
   * @returns {*}
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
   * @param {string} id
   */
  goToNews(id: string) {
    this.navCtrl.push('NewsDetailsPage', { id });
  }

  /**
   *
   * @returns {Promise<News[]>}
   *
   * @memberOf NewsListController
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
   * @param {any} filter
   *
   * @memberOf NewsListController
   */
  private filterNews = filter => {
    if (filter) {
      Object.assign(this.filter, filter);
      this.getFirstPage(this.filter);
    }
  };
}
