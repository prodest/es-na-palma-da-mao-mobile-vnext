import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NewsDetails } from '../../model';
import { NewsApiService } from '../../providers/news-api.service';

/**
 * Generated class for the NewsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
