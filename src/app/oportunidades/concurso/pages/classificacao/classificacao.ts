import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import deburr from 'lodash-es/deburr';

import { Classificacao } from '../../model/';
import { DtApiService } from '../../providers';

@IonicPage({
  segment: 'idConcursos/:id/classificados'
})
@Component({
  selector: 'espm-dt-classificacao-page',
  templateUrl: 'classificacao.html'
})
export class ClassificacaoPage {
  nomeConcurso: string;
  all: Classificacao[];
  filtered: Classificacao[];
  classificados: Classificacao[];

  /**
   *
   */
  constructor(private navParams: NavParams, private api: DtApiService) {}

  /**
   *
   */
  ionViewWillLoad() {
    this.nomeConcurso = this.navParams.data.nomeConcurso;
    this.getClassificados(this.navParams.data.idConcurso, this.navParams.data.idCargo);
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
  getClassificados(idConcurso, idCargo) {
    this.api.getClassificacao(idConcurso, idCargo).subscribe(classificados => {
      this.all = this.filtered = this.classificados = classificados;
    });
  }

  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
