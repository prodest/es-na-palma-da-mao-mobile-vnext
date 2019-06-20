import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'encaminhamento'
})
@Component({
  selector: 'forward-basic',
  templateUrl: 'forward-basic.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ForwardBasicPage {}