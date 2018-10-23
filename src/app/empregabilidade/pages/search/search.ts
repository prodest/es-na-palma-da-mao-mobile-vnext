import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { isArray } from 'ionic-angular/umd/util/util';

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
        duration: 2000
      });
      loader.present();

      concursos = await this.searchProvider.search(this.buscaEmprego);
      if (concursos.status != 0) {
        this.searchProvider.salvaConcursos(concursos);
      } else {
        let toast = this.toastCtrl.create({
          message: 'Usando dados em memoria',
          position: 'bottom',
          duration: 4000
        });
        toast.present(toast);
        concursos = await this.searchProvider.emMemoria();
      }
      loader.dismiss();
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
