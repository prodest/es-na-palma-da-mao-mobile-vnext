import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'captura-iniciada-por-mim'
})
@Component({
  selector: 'captured-by-me',
  templateUrl: './captured-by-me.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CapturedByMePage {}
