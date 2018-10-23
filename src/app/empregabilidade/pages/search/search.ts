import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  items: Array<{ value: string; description: string }>;
  filter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public searchProvider: SearchProvider) {}
  proximo(concursos) {
    this.navCtrl.push('ListResultPage', concursos);
  }
  search(param) {
    let concursos = this.searchProvider.search(param);
    this.proximo(concursos);
  }
}
