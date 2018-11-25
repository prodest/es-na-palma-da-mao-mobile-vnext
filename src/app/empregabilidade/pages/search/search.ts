import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';

@IonicPage()
@Component({
  selector: 'espm-page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  items: Array<{ value: string; description: string }>;
  filter: string;
  buscaEmprego: string = '';

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public searchProvider: SearchProvider,
    public loadingCtrl: LoadingController
  ) {}
  proximo(concursos) {
    this.navCtrl.push('ListResultPage', concursos);
  }
  async carregaFavoritos(concursos) {
    let favoritos = await this.searchProvider.carregaFavoritos();
    let difconcursos = [];
    await favoritos.map(e => {
      if (!concursos.some(element => element.id === e.id)) {
        difconcursos.push(e);
      }
    });
    await difconcursos.map(e => concursos.push(e));
    return concursos;
  }
  async search() {
    let concursos: Array<Concurso> = [];
    if (this.buscaEmprego.length > 0) {
      let loader = this.loadingCtrl.create({
        content: 'Aguarde, buscando concursos'
      });
      loader.present();

      try {
        let concursoOnline = await this.searchProvider.search(this.buscaEmprego);
        concursoOnline.map(c => concursos.push(c));
      } catch (error) {
        console.error(error);
      } finally {
        // concursos = await this.carregaFavoritos(concursos);
        loader.dismiss();
        if (concursos.length > 0) {
          this.proximo(concursos);
        } else {
          let toast = this.toastCtrl.create({
            message: 'Nenhum concurso encontrado',
            position: 'bottom',
            duration: 2000
          });
          toast.present(toast);
        }
      }
    } else {
      let toast = this.toastCtrl.create({
        message: 'Insira uma palavra a ser buscada',
        position: 'bottom',
        duration: 2000
      });
      toast.present(toast);
    }
  }
}
