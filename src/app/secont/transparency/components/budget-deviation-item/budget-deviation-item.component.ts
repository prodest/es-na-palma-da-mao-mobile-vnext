import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BudgetDeviationItem } from '../../model';

@Component({
  selector: 'budget-deviation-item',
  templateUrl: './budget-deviation-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetDeviationItemComponent {
  @Input() item: BudgetDeviationItem;
}
