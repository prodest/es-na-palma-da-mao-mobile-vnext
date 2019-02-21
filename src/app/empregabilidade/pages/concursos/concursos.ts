import { Component } from '@angular/core';
import { trackById } from '@espm/core';
import { IonicPage, NavController } from 'ionic-angular';
import deburr from 'lodash-es/deburr';

import { Concurso } from '../../model';
import { DtApiService } from '../../providers';

@IonicPage({
  segment: 'concursos'
})
@Component({
  selector: 'espm-dt-concursos-page',
  templateUrl: 'concursos.html'
})
export class ConcursosPage {
  allConcursos: Concurso[];
  filteredConcursos: Concurso[];
  trackById = trackById;
  /**
   *
   */
  constructor(private navCtrl: NavController, private api: DtApiService) {}

  /**
   *
   */
  ionViewWillEnter() {
    this.getAllConcursos();
  }

  /**
   *
   */
  search = e => {
    const search = this.normalize(e.target.value);
    this.filteredConcursos = this.allConcursos.filter(concurso => {
      return this.normalize(concurso.orgao).includes(search) || this.normalize(concurso.descricao).includes(search);
    });
  };

  /**
   *
   */
  clear = () => {
    this.filteredConcursos = [...this.allConcursos];
  };

  /**
   *
   */
  showDetails(id) {
    this.navCtrl.push('ConcursoPage', { id });
  }

  /**
   *
   */
  private getAllConcursos() {
    this.api.gelAllConcursos().subscribe(concursos => {
      this.allConcursos = this.filteredConcursos = concursos;
    });
  }

  // tamanho do nome "orgão" limitado 
  limite = (valor) => {
    if (valor.length > 12){
      return valor.substring(0, 12)+"…";
      }else{
      return valor;
      }
  }

  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
