import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

import { Hit } from './../../model';

@Component({
  selector: 'search-hit-item',
  templateUrl: './search-hit-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchHitItemComponent {
  @Input() hit: Hit;

  /**
   *
   *
   */
  constructor(private socialSharing: SocialSharing) {}

  /**
   *
   *
   */
  share(hit: Hit): void {
    this.socialSharing.shareWithOptions({
      message: `DIO ES - ${hit.date} - Pág. ${hit.pageNumber}`,
      subject: `DIO ES - ${hit.date} - Pág. ${hit.pageNumber}`,
      url: hit.pageUrl
    });
  }

  /**
   *
   *
   */
  open(url: string): void {
    window.open(url, '_system');
  }
}
