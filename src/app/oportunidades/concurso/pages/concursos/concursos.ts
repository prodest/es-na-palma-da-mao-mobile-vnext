// import { Auth } from './../../../../../libs/core/auth/index';


import { Component } from '@angular/core';
import { trackById, AuthQuery } from '@espm/core';
import { IonicPage, NavController } from 'ionic-angular';
import deburr from 'lodash-es/deburr';
import { Concurso } from '../../model';
import { SelecaoQuery, SelecaoService } from '../../providers';
import { Subject } from 'rxjs/Subject';
import { SelecaoApiService } from '../../providers/selecao.api.service';


@IonicPage({
  segment: 'concursos'
})
@Component({
  selector: 'espm-dt-concursos-page',
  templateUrl: 'concursos.html'
})
export class ConcursosPage {
  /* exemplo de novo retorno */ 
  porcentagens1: Array<Object> = [
    {
      "cpf": "12345678902",
      "sedu": 99.5000,
      "sesa": 65.7073,
      "sejus": 99.0,
      "iases": 90.58
    }
  ];
    
  porcentagens2: Array<Object> = [{}]
  

  /**
  *
  */
  concursos$: Subject<Concurso[]>; // concursos que são exibidos na tela
  concursosLenght: number;
  allConcursos: Concurso[];
  filteredConcursos: Concurso[];
  trackById = trackById;
  valor = [];
  /**
  *
  */
  constructor(private auth: AuthQuery, private navCtrl: NavController, private service: SelecaoService, private query: SelecaoQuery, private selecaoApiService: SelecaoApiService) {
    this.concursos$ = new Subject();
    if (this.auth.isLoggedIn) 
    {
       let cpf = this.auth.state.claims.cpf  // funcao que pega o cpf pronto 
      // let cpf =  '03147642755'; // '03147642755'; // this.auth.state.claims.cpf;
       this.selecaoApiService.getPorcentagem(cpf).subscribe(dados => {this.porcentagens1 = dados});
    }
    console.log(this.valor)
  }
  /**
  *
  */
  verificationOrgan() {
  }
  /*
  *
  */

  hasPercent(orgao: string) {
    
    if ( this.porcentagens1[0][orgao.toLowerCase()] != undefined )
    {
      return true;
    }
    return false;
  }   
    
  
  
  ionViewWillLoad() {
    
    this.query
    .selectAll()
    .subscribe((concursos: Concurso[]) => {
      // console.log(concursos);
      
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
      return valor.substring(0, 12)+"…";
    } else {
      return valor;
    }
  }
  
  /**
  *
  */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
