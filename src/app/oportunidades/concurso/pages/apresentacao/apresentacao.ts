import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'apresentacao',
  templateUrl: 'apresentacao.html'
})
export class ApresentacaoPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  botoes = [
    {
      nome: 'Designação Temporaria',
      pagina: 'ConcursosPage'
    },
    {
      nome: 'Seleção Alunos',
      pagina: 'ListaOportunidadesPage'
    }
  ];
  open(pagina) {
    this.navCtrl.push(pagina)
  }
}
