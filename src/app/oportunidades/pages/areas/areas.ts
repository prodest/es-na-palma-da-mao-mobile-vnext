import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import deburr from 'lodash-es/deburr';

import { Areas, Cargo } from '../../model';

@IonicPage({
  segment: 'concursos/:id/areas'
})
@Component({
  selector: 'espm-dt-areas-page',
  templateUrl: 'areas.html'
})
export class AreasPage {
  nomeConcurso: string;
  idConcurso: number;
  areas: Areas[];
  cargos: Cargo[];
  all: any[];
  filtered: any[];
  areaAnterior: Areas[];

  /**
   *
   */
  constructor(private navParams: NavParams, private navCtrl: NavController) {}

  /**
   *
   */
  ionViewWillLoad() {
    this.nomeConcurso = this.navParams.data.nomeConcurso;
    this.idConcurso = this.navParams.data.idConcurso;
    this.navParams.data.newArea
      ? (this.areas = this.navParams.data.newArea.areas)
      : (this.areas = this.navParams.data.areas);

    this.navParams.data.cargos ? (this.cargos = this.navParams.data.cargos) : (this.cargos = []);
    if (this.areas != null) {
      this.filtered = this.all = this.areas;
    } else {
      this.filtered = this.all = this.cargos;
    }
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
    this.filtered = this.all.filter(area => {
      return this.normalize(area.nome).includes(search);
    });
  };
  /**
   *
   */
  goToNext = area => {
    this.navCtrl.push('AreasPage', {
      idConcurso: this.idConcurso,
      nomeConcurso: this.nomeConcurso,
      area: this.areas,
      newArea: area,
      cargos: area.cargos
    });
  };

  /**
   *
   */
  telaClassificacao = idCargo => {
    this.navCtrl.push('ClassificacaoPage', {
      nomeConcurso: this.nomeConcurso,
      idCargo: idCargo,
      idConcurso: this.idConcurso
    });
  };
  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
