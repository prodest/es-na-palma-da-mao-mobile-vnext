import { AlunosApiService } from './../../providers/alunos.api.service';
// import { ID } from '@datorama/akita';
import { Component } from '@angular/core';
import { trackById, AuthQuery } from '@espm/core';
import { IonicPage, NavController } from 'ionic-angular';
import deburr from 'lodash-es/deburr';
import { Concurso } from '../../model';
import { AlunosQuery, AlunoService } from '../../providers';
import { map } from 'rxjs/operators';

type Distancia = {
  cpf: string,
  cursos: Array<number>
}

@IonicPage({
  segment: 'alunos'
})
@Component({
  selector: 'espm-lista-oportunidades-page',
  templateUrl: 'lista-oportunidades.html'
})
export class ListaOportunidadesPage {

  /* exemplo de novo retorno */ 
 
  distancia2: Array<Distancia> = [];
  /**
   *
   */
  allConcursos: Concurso[];
  filteredConcursos: Concurso[];
  trackById = trackById;

  /**
   *
   */
  constructor(
    private navCtrl: NavController,
    private auth: AuthQuery,
    private service: AlunoService,
    private query: AlunosQuery,
    private apiService: AlunosApiService) {}
  
  /**
   *
   */
  ionViewWillLoad() {
    // carrega dados
    this.service.loadAll();
    this.query
      .selectAll()
      .pipe(map(concursos => concursos.sort(this.sortConcursos)))
      .subscribe(concursos => {
        
        
        this.allConcursos = this.filteredConcursos = concursos;
        
      });
    this.recebeDados();

  }
  /**
   *
   */
  private sortConcursos = (a: Concurso, b: Concurso) => {
    if (a.favorito && b.favorito) {
      return 1;
    } else if (a.favorito) {
      return -1;
    } else if (b.favorito) {
      return 1;
    } else {
      return 1;
    }
  };

  /**
   *
   */
  search = e => {
    const search = this.normalize(e.target.value);
    this.filteredConcursos = this.allConcursos.filter(concurso => {
      return this.normalize(concurso.nome).includes(search) || this.normalize(concurso.tipo).includes(search);
    });
  };
  
  /**
   *  volta para pagina de apresentação
   */
  backPageOne() {
    this.navCtrl.push('Apresentacao');
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
    this.navCtrl.push('DetalheOportunidadePage', { id });
  }

  // tamanho do nome "orgão" limitado
  limite = valor => {
    if (valor.length > 12) {
      return valor.substring(0, 12) + '…';
    } else {
      return valor;
    }
  };

  recebeDados()
  {
    if (this.auth.isLoggedIn) 
    {
      let cpf = this.auth.state.claims.cpf; 
      this.apiService.getDistancias(cpf).subscribe(dados => { this.distancia2 = dados; },()=>{});
    }
  }

  checaCurso(cursoId: number) 
  {
    let cursos: Array<number> = this.distancia2[0]["cursos"];
    return cursos.some((curso) => curso == cursoId);
  }

  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
