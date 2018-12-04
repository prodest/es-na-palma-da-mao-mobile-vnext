import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type Sort = 'desc' | 'asc';

@Component({
  selector: 'report-list-summary',
  templateUrl: './report-list-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportListSummaryComponent {
  @Input() sort: Sort = 'asc';
  @Output() onSort = new EventEmitter<Sort>();

  /**
   *
   *
   */
  toggleSort = sort => {
    this.sort = this.sort === 'asc' ? 'desc' : 'asc';
    this.onSort.emit(this.sort);
  };
}
