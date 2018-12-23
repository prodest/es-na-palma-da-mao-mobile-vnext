import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DtApiService } from '../../providers';
import { Concurso } from './../../model';

@IonicPage({
  segment: 'concursos/:id'
})
@Component({
  selector: 'espm-dt-concurso-page',
  templateUrl: 'concurso.html'
})
export class ConcursoPage {
  concurso: Concurso;

  /**
   *
   */
  constructor(private navCtrl: NavController, private navParams: NavParams, private api: DtApiService) {}

  /**
   *
   */
  ionViewWillLoad() {
    this.getConcurso(this.navParams.data.id);
  }

  /**
   *
   */
  getConcurso = (id: number) => {
    this.api.getConcurso(id).subscribe(concurso => (this.concurso = concurso));
  };

  /**
   *
   */
  openLink(link) {
    window.open(link, '_system', 'location=yes');
  }

  /**
   *
   */
  showClassificados(concurso: Concurso) {
    this.navCtrl.push('ClassificacaoPage', { concurso });
  }
}
