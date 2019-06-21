import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'encaminhamento-mensagem'
})
@Component({
  selector: 'forward-message',
  templateUrl: 'forward-message.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ForwardMessagePage {}