import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListProvider } from '../../providers/list/list';

@IonicPage()
@Component({
  selector: 'page-list-result',
  templateUrl: 'list-result.html'
})
export class ListResultPage {
  tab: any = 'open';
  concursosAbertos: any;
  concursosFechado: any;
  concursosAndamento: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public listProvider: ListProvider) {
    this.inicializa();
  }

  detail(concurso) {
    this.navCtrl.push('DetailsPage', concurso);
  }
  async inicializa() {
    let listaConcursos = await this.navParams.data;
    this.concursosAbertos = this.listProvider.listarAberto(listaConcursos, 'aberto');
    this.concursosFechado = this.listProvider.listarAberto(listaConcursos, 'fechado');
    this.concursosAndamento = this.listProvider.listarAberto(listaConcursos, 'andamento');
  }
}
