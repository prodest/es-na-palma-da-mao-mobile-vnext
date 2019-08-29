import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-presentation-edocs',
  templateUrl: 'presentation-edocs.html',
})
export class PresentationEdocsPage {
  menus = [
    {
      buttonTitle: "Meus Processos",
      targetPage: "DocumentsToSignPage"
    },
    {
      buttonTitle: "Consultar Processo",
      targetPage: "SepSearchPage"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
