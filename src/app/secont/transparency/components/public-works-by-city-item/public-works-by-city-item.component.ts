import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PublicWorksByCityItem, PublicWorkStatus } from '../../model';

@Component({
  selector: 'public-works-by-city-item',
  templateUrl: './public-works-by-city-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicWorksByCityItemComponent {
  PublicWorkStatus = PublicWorkStatus;
  @Input() item: PublicWorksByCityItem;
}
