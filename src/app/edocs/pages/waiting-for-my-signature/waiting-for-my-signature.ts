import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'aguardando-minha-assinatura'
})
@Component({
  selector: 'waiting-for-my-signature',
  templateUrl: './waiting-for-my-signature.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class WaitingForMySignaturePage {}
