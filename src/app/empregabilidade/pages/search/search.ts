import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';

@IonicPage()
@Component({
  selector: 'page-search',
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
    let difconcursos = concursos.filter(element => favoritos.indexOf(element));
    console.log('será que fez a dif?', difconcursos);
    concursos.concat(difconcursos);
    console.log('será que fez a concat?', concursos);
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
        concursoOnline.forEach(element => {
          concursos.push(element);
        });
      } catch {
        console.error();
      } finally {
        concursos = await this.carregaFavoritos(concursos);
        loader.dismiss();
        this.proximo(concursos);
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
