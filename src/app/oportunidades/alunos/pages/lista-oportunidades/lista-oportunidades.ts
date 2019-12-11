import { AlunosApiService } from './../../providers/alunos.api.service';
// import { ID } from '@datorama/akita';
import { Component } from '@angular/core';
import { trackById, AuthQuery } from '@espm/core';
import { IonicPage, NavController } from 'ionic-angular';
import deburr from 'lodash-es/deburr';
import { Concurso } from '../../model';
import { AlunosQuery, AlunoService } from '../../providers';
import { map } from 'rxjs/operators';
@IonicPage({
  segment: 'alunos'
})
@Component({
  selector: 'espm-lista-oportunidades-page',
  templateUrl: 'lista-oportunidades.html'
})
export class ListaOportunidadesPage {

  /* exemplo de novo retorno */ 
  distancia2: Array<object> = [];
  distancia: Array<Object> = [
    {
      "cpf": "12345678902",
      "cursos": [168,169,44,150,90,60,56,180,51]
    }
  ];
  
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
        console.log(concursos);
        
        this.allConcursos = this.filteredConcursos = concursos;
      });

    // this.recebeDados();
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
      let cpf = '03147642755'; // this.auth.state.claims.cpf;
      this.apiService.getDistancias(cpf).subscribe(dados => { this.distancia2 = dados; });
    }
  }

  checaCurso(cursoId: number) {
    let cursos: [] = this.distancia[0]["cursos"];
    return cursos.some((curso) => curso == cursoId);
  }
  /* match_id_curso(concursos) {  // funcao que verifica se os orgaos recebidos estao iguais
    
    {  // se o usuario esta logado
      let cpf = '03147642755'; // this.auth.state.claims.cpf;
      let newConcursos = []; // necessario criar pois nao estava reconhecendo o objeto criado.
          
      this.AlunosApiService.getDistancias(cpf).subscribe(dados => {this.dadosTeste = this.distancia2;});
    
      concursos.map(  // loop de fora 
        (concurso: Concurso) => { 
          let distancia;

          this.dadosTeste.map(
            (dados) => { 
              if (dados.distancia[1] === concurso.id) {
                distancia = 1;
              }
            }
          );
      
        
          newConcursos.push({
            ...concurso,
            porcentagem: distancia
          });
        }
      );
      return newConcursos;
    }

    return concursos;
  } */



  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
