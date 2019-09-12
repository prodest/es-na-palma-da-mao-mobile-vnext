import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-presentation-edocs',
  templateUrl: 'presentation-edocs.html',
})
export class PresentationEdocsPage {
  menus = [
    {
      buttonTitle: "Consultar Processo",
      targetPage: "SepSearchPage"
    },
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
    
  ];

 
}
