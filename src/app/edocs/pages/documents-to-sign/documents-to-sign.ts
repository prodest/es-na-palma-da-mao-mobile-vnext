import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  segment: 'documentos'
})
@Component({
  selector: 'documents-to-sign',
  templateUrl: './documents-to-sign.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsToSignPage {
  menus = [
    {
      buttonTitle: 'Aguardando minha assinatura',
      targetPage: 'WaitingForMySignaturePage'
    },
    {
      buttonTitle: 'Assinei - aguardando os demais',
      targetPage: 'SignedByMePage'
    },
    {
      buttonTitle: 'Recusei - aguardando os demais',
      targetPage: 'RefusedByMePage'
    },
    {
      buttonTitle: 'Captura iniciada por mim',
      targetPage: 'CapturedByMePage'
    }
  ]
  /**
   *
   */
  constructor() {}
}
