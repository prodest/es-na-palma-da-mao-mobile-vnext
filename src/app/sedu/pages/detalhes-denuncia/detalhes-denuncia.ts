import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalhes-denuncia',
  templateUrl: 'detalhes-denuncia.html',
})
export class DetalhesDenunciaPage {
  denuncia;

  constructor(
    public navParams: NavParams
  ) {
    this.denuncia = navParams.get('demand');
  }

  ionViewWillLoad() {
    
  }

  date(date: string) {
    return (new Date(date)).toLocaleString();
  }
}
