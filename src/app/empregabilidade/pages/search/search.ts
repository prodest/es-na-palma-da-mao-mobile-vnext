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
  async search() {
    let concursos;
    if (this.buscaEmprego.length > 0) {
      let loader = this.loadingCtrl.create({
        content: 'Aguarde, buscando concursos',
      });
      loader.present();
      try {
        concursos = await this.searchProvider.search(this.buscaEmprego);
        this.searchProvider.salvaConcursos(concursos);
        console.log("usando dados em online")
        loader.dismiss();
      } catch {
        console.log("usando dados em memoria")
        loader.dismiss();
        concursos = await this.searchProvider.emMemoria();
      }
      this.proximo(concursos);
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
