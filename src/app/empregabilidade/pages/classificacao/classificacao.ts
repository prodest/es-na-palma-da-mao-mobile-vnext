import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import deburr from 'lodash-es/deburr';

import { Classificacao, Concurso } from '../../model';
import { DtApiService } from '../../providers';

@IonicPage({
  segment: 'concursos/:id/classificados'
})
@Component({
  selector: 'espm-dt-classificacao-page',
  templateUrl: 'classificacao.html'
})
export class ClassificacaoPage {
  all: Classificacao[];
  filtered: Classificacao[];
  concurso: Concurso;

  /**
   *
   */
  constructor(private navParams: NavParams, private api: DtApiService) {}

  /**
   *
   */
  ionViewWillLoad() {
    this.concurso = this.navParams.data.concurso;
    this.getClassificados(this.concurso.id);
  }

  /**
   *
   */
  clear = () => {
    this.filtered = this.all;
  };

  /**
   *
   */
  search = e => {
    const search = this.normalize(e.target.value);
    this.filtered = this.all.filter(classificado => {
      return this.normalize(classificado.nome).includes(search);
    });
  };

  /**
   *
   */
  getClassificados(id) {
    this.api.getClassificacao(id).subscribe(classificados => {
      this.all = this.filtered = classificados;
    });
  }

  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
