import { Component } from '@angular/core';
import { trackById } from '@espm/core';
import { IonicPage, NavController } from 'ionic-angular';
import deburr from 'lodash-es/deburr';
import { Concurso } from '../../model';
import { DtApiService } from '../../providers';
import { Observable } from 'rxjs/Observable';
import { SelecaoQuery } from '../../state';
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
  concursos$: Observable<Concurso[]>;
  loading$: Observable<boolean>;

  /**
   *
   */
  constructor(private navCtrl: NavController, private api: DtApiService, private favoritosQuery: SelecaoQuery) {}

  /**
   *
   */
  ionViewWillEnter() {
    this.loading$ = this.favoritosQuery.selectLoading();
    this.concursos$ = this.favoritosQuery.selectAll();
    this.concursos$.pipe().subscribe(concurso => {
      this.allConcursos = this.filteredConcursos = concurso;
    });
    this.api.getFavoritos();
    // this.getAllConcursos();
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
  getAllConcursos() {
    this.api.gelAllConcursos().subscribe(concursos => {
      this.allConcursos = this.filteredConcursos = concursos;
    });
  }

  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');

  /**
   *
   */
}
