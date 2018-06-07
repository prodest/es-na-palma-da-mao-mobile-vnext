import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'beta-ribbon',
  template: `<div>
  <div class="ribbon"><span>BETA</span></div>
</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BetaRibbonComponent {
  @Input() hour: string;
}
