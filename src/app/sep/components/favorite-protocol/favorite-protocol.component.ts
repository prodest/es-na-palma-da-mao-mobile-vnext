import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FavoriteProtocol } from '../../model';

@Component({
  selector: 'favorite-protocols',
  templateUrl: './favorite-protocol.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteProtocolComponent {
  @Input() protocols: FavoriteProtocol[];
  @Output() open = new EventEmitter<FavoriteProtocol>();
}
