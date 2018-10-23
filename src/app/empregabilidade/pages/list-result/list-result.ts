import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public listProvider: ListProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    this.inicializa();
  }

  async detail(concurso) {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde, atualizando concurso',
      duration: 2000
    });
    loader.present();
    try {
      let concursoAtualizado = await this.listProvider.atualizaConcurso(concurso);

      if (concursoAtualizado.status != 0) {
        concurso = concursoAtualizado;
      }
    } catch (error) {
      console.log('Erro ao atualizar concurso', error);
    }
    loader.dismiss();
    this.navCtrl.push('DetailsPage', concurso);
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
    } catch (error) {
      console.log('Erro ao organizar ', error);
    }
    loader.dismiss();
  }
}
