import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { News } from './../../model';

@Component({
  selector: 'news-list-item',
  templateUrl: './news-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListItemComponent {
  @Input() news: News;
}
