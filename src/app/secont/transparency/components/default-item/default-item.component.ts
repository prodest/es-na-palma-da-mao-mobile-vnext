import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { MoneyFlowItem, PublicWorksItem } from '../../model';

@Component({
  selector: 'default-item',
  templateUrl: './default-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultItemComponent {
  @Input() item: MoneyFlowItem | PublicWorksItem;
  @Input() clickable: boolean;
}
