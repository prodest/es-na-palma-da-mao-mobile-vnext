import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { NewsDetails } from '../model';

@Pipe({
  name: 'wasUpdated'
})
export class WasUpdatedPipe implements PipeTransform {
  /**
   *
   *
   */
  transform(news: NewsDetails) {
    return news.lastModified && !moment(news.date).isSame(news.lastModified, 'day');
  }
}
