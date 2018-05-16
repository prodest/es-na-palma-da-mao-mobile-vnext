import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NewsDetails } from '../../model/newsDetails';
import * as moment from 'moment';

/**
 * Generated class for the CardNoticiaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'card-noticia',
  templateUrl: 'card-noticia.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardNoticiaComponent {
  @Input() public news: NewsDetails;
  @Input() public highlight: boolean = false;

  constructor() {
    console.log('Hello CardNoticiaComponent Component');
  }

  /**
   *
   *
   * @param {NewsDetail} news
   * @returns
   *
   * @memberOf NewsDetailController
   */
  public wasUpdated(news: NewsDetails) {
    return news.lastModified && !moment(news.date).isSame(news.lastModified, 'day');
  }
}
