import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NewsDetails } from '../../model';

@Component({
  selector: 'card-noticia',
  templateUrl: 'card-noticia.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardNoticiaComponent {
  @Input() news: NewsDetails;
  @Input() highlight: boolean = false;
}
