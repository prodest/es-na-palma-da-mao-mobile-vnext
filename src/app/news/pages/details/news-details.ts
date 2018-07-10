import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NewsDetails } from '../../model';
import { NewsApiService } from '../../providers/news-api.service';

@IonicPage({
  segment: 'noticia/:id'
})
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
  providers: [SocialSharing]
})
export class NewsDetailsPage {
  public news: NewsDetails;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socialSharing: SocialSharing,
    public newsApiService: NewsApiService
  ) {}

  ionViewWillEnter() {
    this.newsApiService.getNewsById(this.navParams.data.id).subscribe((news: NewsDetails) => (this.news = news));
  }

  /**
   *
   *
   * @param {string} link
   *
   * @memberOf NewsDetailController
   */
  public share(news: NewsDetails): void {
    let shareOptions = {
      message: news.title,
      subject: news.title,
      url: news.url
    };

    this.socialSharing.shareWithOptions(shareOptions);
  }
}
