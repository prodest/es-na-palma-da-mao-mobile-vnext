import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicPage, NavParams } from 'ionic-angular';

import { NewsDetails } from '../../model';
import { NewsApiService } from '../../providers';

@IonicPage({
  segment: 'noticia/:id'
})
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html'
})
export class NewsDetailsPage {
  news: NewsDetails;

  /**
   *
   *
   */
  constructor(private navParams: NavParams, private socialSharing: SocialSharing, private newsApiService: NewsApiService) {}

  /**
   *
   *
   */
  ionViewWillEnter() {
    this.newsApiService.getNewsById(this.navParams.data.id).subscribe((news: NewsDetails) => (this.news = news));
  }

  /**
   *
   *
   */
  share(news: NewsDetails): void {
    let shareOptions = {
      message: news.title,
      subject: news.title,
      url: news.url
    };

    this.socialSharing.shareWithOptions(shareOptions);
  }
}
