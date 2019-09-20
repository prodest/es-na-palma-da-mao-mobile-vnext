import { Component } from '@angular/core';
import { trackById } from '@espm/core';
import { IonicPage, NavController } from 'ionic-angular';
import deburr from 'lodash-es/deburr';
import { Concurso } from '../../model';
import { SelecaoQuery, SelecaoService } from '../../providers';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@IonicPage({
  segment: 'concursos'
})
@Component({
  selector: 'espm-dt-concursos-page',
  templateUrl: 'concursos.html'
})
export class ConcursosPage {
  /**
   *
   */
  allConcursos: Concurso[];
  filteredConcursos: Concurso[];
  trackById = trackById;

  /**
   *
   */
  constructor(private navCtrl: NavController, private service: SelecaoService, private query: SelecaoQuery) { }

  /**
   *
   */
  ionViewWillLoad() {
    this.query
      .selectAll()
      .pipe(map(concursos => {
        _.sortBy(concursos, this.sortConcursos);
        return concursos;
      }))
      .subscribe(concursos => {
        this.allConcursos = this.filteredConcursos = concursos;
      });

    // carrega dados
    this.service.loadAll();
  }
  /**
   *
   */
  private sortConcursos = (a: Concurso) => {
    return a && a.favorito;
  };

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
   *  volta para pagina de apresentação
   */
  backPageOne() {
    this.navCtrl.push('Apresentacao')
  }
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

  // tamanho do nome "orgão" limitado 
  limite = (valor) => {
    if (valor.length > 12) {
      return valor.substring(0, 12) + "…";
    } else {
      return valor;
    }
  }

  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
