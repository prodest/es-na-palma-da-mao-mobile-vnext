import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { SearchProvider } from '../../providers/dt-search/dt-search';
import deburr from 'lodash-es/deburr';
import { Concurso } from '../../dto/Concurso';
@IonicPage()
@Component({
  selector: 'espm-page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  allConcursos: Concurso[];
  filteredConcursos: Concurso[];

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public searchProvider: SearchProvider,
    public loadingCtrl: LoadingController
  ) {
    this.carrega();
  }

  async ionViewWillLoad() {
    this.filteredConcursos = this.allConcursos;
  }
  async carrega() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde, buscando concursos'
    });
    loader.present();
    this.allConcursos = await this.searchProvider.search('');
    loader.dismiss();
    this.clear();
  }

  trackByStatus = (index: string, concurso: Concurso) => concurso.status;

  search = e => {
    const search = this.normalize(e.target.value);
    this.filteredConcursos = this.allConcursos.filter(concurso => {
      return this.normalize(concurso.orgao).includes(search) || this.normalize(concurso.descricao).includes(search);
    });
  };

  clear = () => {
    this.filteredConcursos = this.allConcursos;
  };

  showDetails = () => {
    // this.navCtrl.push('ConcursoDetailsPage');
  };

  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
