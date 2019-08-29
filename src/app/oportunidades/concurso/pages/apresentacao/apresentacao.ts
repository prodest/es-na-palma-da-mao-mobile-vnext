import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'apresentacao-page',
  templateUrl: 'apresentacao.html'
})
export class ApresentacaoPage {
  menus = [
    {
      buttonTitle: "Cursos",
      targetPage: "ListaOportunidadesPage"
    },
    {
      buttonTitle: "Designação Temporária",
      targetPage: "ConcursosPage"
    }
  ]
  constructor() {}
}
