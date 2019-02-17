import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'assinados-por-mim'
})
@Component({
  selector: 'signed-by-me',
  templateUrl: './signed-by-me.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class SignedByMePage {}
