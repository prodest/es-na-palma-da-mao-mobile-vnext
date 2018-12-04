import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'report-title',
  templateUrl: './report-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportTitleComponent {
  @Input() title: string;
  @Input() info: string;
  showInfo = false;

  hasInfo() {
    return !!this.info;
  }
}
