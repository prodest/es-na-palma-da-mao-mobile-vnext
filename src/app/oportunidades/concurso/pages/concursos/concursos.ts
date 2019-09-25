import { Component } from '@angular/core';
import { trackById } from '@espm/core';
import { IonicPage, NavController } from 'ionic-angular';
import deburr from 'lodash-es/deburr';
import { Concurso } from '../../model';
import { SelecaoQuery, SelecaoService } from '../../providers';
import { Subject } from 'rxjs/Subject';

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
  concursos$: Subject<Concurso[]>; // concursos que são exibidos na tela
  concursosLenght: number;
  allConcursos: Concurso[];
  filteredConcursos: Concurso[];
  trackById = trackById;
  
  /**
<<<<<<< HEAD
   *
   */
  constructor(private navCtrl: NavController, private service: SelecaoService, private query: SelecaoQuery) { }

=======
  *
  */
  constructor(private navCtrl: NavController, private service: SelecaoService, private query: SelecaoQuery) {
    this.concursos$ = new Subject();
  }
  
>>>>>>> 757056b03b08421f08618410abd991ad6683acff
  /**
  *
  */
  ionViewWillLoad() {
    this.query
    .selectAll()
    .subscribe((concursos: Concurso[]) => {
      this.allConcursos = concursos;
      this.updateConcursos(concursos);
    });
    
    // carrega dados
    this.service.loadAll();
  }
  /**
  *
  */
  private updateConcursos = (concursos: Concurso[]) => {
    this.concursos$.next(
      this.sortByFavorites(concursos)
    );
    this.concursosLenght = concursos.length;
  };

  private sortByFavorites = (concursos: Concurso[]): Concurso[] => {
    const favorites: Concurso[] = concursos.filter((concurso: Concurso) => concurso.favorito);
    const noFavorites: Concurso[] = concursos.filter((concurso: Concurso) => !concurso.favorito);
    return favorites.concat(noFavorites);
  }
  
  /**
  *
  */
  search = e => {
    const search = this.normalize(e.target.value);
    
    // se o texto da pesquisa estiver vazio, exibe tudo
    if (search.length === 0) this.updateConcursos(this.allConcursos);
    
    // artibui o resultado da busca ao Subject de concursos
    this.updateConcursos(
      // efetivamente faz a busca      
      this.filteredConcursos = this.allConcursos.filter(concurso => {
        return this.normalize(concurso.orgao).includes(search) || this.normalize(concurso.descricao).includes(search);
      })
    );
  };
  /**
<<<<<<< HEAD
   *  volta para pagina de apresentação
   */
=======
  *  volta para pagina de apresentação
  */
>>>>>>> 757056b03b08421f08618410abd991ad6683acff
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
<<<<<<< HEAD

  // tamanho do nome "orgão" limitado 
  limite = (valor) => {
    if (valor.length > 12) {
      return valor.substring(0, 12) + "…";
=======
  
  // tamanho do nome "orgão" limitado 
  limite = (valor) => {
    if (valor.length > 12) {
      return valor.substring(0, 12)+"…";
>>>>>>> 757056b03b08421f08618410abd991ad6683acff
    } else {
      return valor;
    }
  }
  
  /**
  *
  */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
