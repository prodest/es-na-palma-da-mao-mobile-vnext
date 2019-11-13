import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sedu-index',
  templateUrl: 'sedu-index.html',
})
export class SeduIndexPage {
  menus = [
    {
      buttonTitle: "Nova denúncia",
      targetPage: "SeduDenunciasPage"
    },
    {
      buttonTitle: "Minhas denúncias",
      targetPage: "MinhasDenunciasPage"
    }
  ]

}
