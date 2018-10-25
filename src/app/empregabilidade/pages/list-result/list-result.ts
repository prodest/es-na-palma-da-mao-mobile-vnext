import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { ListProvider } from '../../providers/list/list';
import { SearchProvider } from '../../providers/search/search';

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public listProvider: ListProvider,
    public loadingCtrl: LoadingController,
    public searchProvide: SearchProvider
  ) {
    this.inicializa();
  }

  async detail(concurso) {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde, atualizando concurso',
      duration: 2000
    });
    let concursoAtualizado;
    loader.present();
    try {
      concursoAtualizado = await this.listProvider.atualizaConcurso(concurso);
      loader.dismiss();
      this.navCtrl.push('DetailsPage', concursoAtualizado);
    } catch (e) {
      loader.dismiss();
      console.log('Concurso desatualizado', e + concurso);
      this.navCtrl.push('DetailsPage', concurso);
    }
  }
  async inicializa() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde, Organizando concursos'
    });
    loader.present();
    try {
      let listaConcursos: Array<Concurso> = await this.navParams.data;
      this.concursosAbertos = this.listProvider.listarPorStatus(listaConcursos, 'aberto');
      this.concursosFechado = this.listProvider.listarPorStatus(listaConcursos, 'fechado');
      this.concursosAndamento = this.listProvider.listarPorStatus(listaConcursos, 'andamento');
    } catch {
      console.log('Erro ao organizar itens');
    }
    loader.dismiss();
  }
  favoritos(concurso) {
    this.searchProvide.salvaFavoritos(concurso);
  }
}
