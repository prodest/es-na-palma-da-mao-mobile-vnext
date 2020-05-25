import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { SeduDenunciasApiService } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-detalhes-denuncia',
  templateUrl: 'detalhes-denuncia.html',
})
export class DetalhesDenunciaPage {
  denuncia;

  constructor(
    public navParams: NavParams,
    public api: SeduDenunciasApiService
  ) {
    this.denuncia = navParams.get('demand');
  }

  date(date: string) {
    return (new Date(date)).toLocaleString();
  }
}
