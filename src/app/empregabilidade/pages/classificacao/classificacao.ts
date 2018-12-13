import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Classificado } from '../../dto/Classificado';
import deburr from 'lodash-es/deburr';
/**
 * Generated class for the ClassificacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'espm-page-classificacao',
  templateUrl: 'classificacao.html'
})
export class ClassificacaoPage {
  allClassificado: Classificado[];
  filteredClassificado: Classificado[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {}
  async ionViewWillLoad() {
    this.allClassificado = await this.navParams.data;
    this.clear();
  }
  clear = () => {
    this.filteredClassificado = this.allClassificado;
  };
  search = e => {
    const search = this.normalize(e.target.value);
    this.filteredClassificado = this.allClassificado.filter(classificado => {
      return this.normalize(classificado.nome).includes(search);
    });
  };
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
