import { Component } from '@angular/core';
import { trackById } from '@espm/core';
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
  [x: string]: any;

  distancias = [
    {
      municipio:"Cariacica",
      Distancua: 12
    },
    {
      municipio:"Serra",
      Distancua: 800
    },{
      nome:"Viana",
      idade: 9999999999
    },
  ]
  /**
   *
   */
  allConcursos: Concurso[];
  filteredConcursos: Concurso[];
  trackById = trackById;
  auth: any;
  selecaoApiService: any;
  dadosTeste: any;

  /**
   *
   */
  constructor(private navCtrl: NavController, private service: AlunoService, private query: AlunosQuery) {}

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

  /* 
  

 /* matcheCursos(concursos) {  // funcao que verifica se os orgaos recebidos estao iguais
  if (this.auth.isLoggedIn) {  // se o usuario esta logado
    let cpf = '03147642755'; // this.auth.state.claims.cpf;
    let newConcursos = []; // necessario criar pois nao estava reconhecendo o objeto criado.
    let municipio = this.Curso.municipio;
          
    this.AlunosApiService.getDistancias(cpf, municipio).subscribe(
      dados => { 
        this.dadosTeste = dados
      }
    )
    
    
    concursos.map(  // loop de fora 
      (concurso: Concurso) => { 
        let porcentagem;

        this.dadosTeste.map(
          (dados) => { 
            if (dados.municipio.trim() === Curso.municipio.trim()) 
            {
              porcentagem = dados.porcentagem.tofixed(1);
            }
          }
        );
      
        
        newConcursos.push({
          ...concurso,
          porcentagem: porcentagem
        });
      }
    );

    return newConcursos;
  }

  return concursos;
}



  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
