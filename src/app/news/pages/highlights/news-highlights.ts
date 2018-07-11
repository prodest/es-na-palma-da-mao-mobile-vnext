import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { NewsDetails } from '../../model';
import { NewsApiService } from '../../providers';

@IonicPage({
  segment: 'noticias/destaques'
})
@Component({
  selector: 'page-news-highlights',
  templateUrl: 'news-highlights.html'
})
export class NewsHighlightsPage {
  highlights: NewsDetails[];

  /**
   * Navega para um notícia
   */
  constructor(private navCtrl: NavController, private newsApiService: NewsApiService) {}

  /**
   * Navega para um notícia
   */
  ionViewWillEnter() {
    this.newsApiService.getHighlightNews().subscribe((news: NewsDetails[]) => (this.highlights = news));
  }

  /**
   * Navega para um notícia
   */
  goToNews(id: string) {
    this.navCtrl.push('NewsDetailsPage', { id });
  }
}
