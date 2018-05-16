import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsApiService } from '../../providers/news-api.service';
import { NewsDetails } from '../../model';

/**
 * Generated class for the NewsHighlightsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-highlights',
  templateUrl: 'news-highlights.html'
})
export class NewsHighlightsPage {
  public highlights: NewsDetails[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public newsApiService: NewsApiService) {}

  ionViewWillEnter() {
    this.newsApiService.getHighlightNews().subscribe((news: NewsDetails[]) => (this.highlights = news));
  }

  /**
   * Navega para um notícia
   *
   * @param {string} id
   */
  goToNews(id: string) {
    this.navCtrl.push('NewsDetailsPage', { id });
  }
}
