import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'recusados-por-mim'
})
@Component({
  selector: 'refused-by-me',
  templateUrl: './refused-by-me.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class RefusedByMePage {}
