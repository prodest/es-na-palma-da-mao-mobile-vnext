import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import deburr from 'lodash-es/deburr';

import { Concurso } from '../../model/concurso';

@IonicPage()
@Component({
  selector: 'page-search-concursos',
  templateUrl: 'search-concursos.html'
})
export class SearchConcursosPage {
  allConcursos: Concurso[];
  filteredConcursos: Concurso[];

  constructor(private navCtrl: NavController) {
    
  }

  ionViewWillLoad() {
    this.allConcursos = [
      { id: '1', nome: 'Algum texto diferente pra testar a busca', status: 'aberto', descricao: 'algum concurso' },
      { id: '2', nome: 'Teste Concurso', status: 'aberto', descricao: 'algum concurso' },
      { id: '3', nome: 'Concurso 1', status: 'aberto', descricao: 'algum concurso' },
      { id: '4', nome: 'Concurso Testando', status: 'aberto', descricao: 'algum concurso' },
      { id: '5', nome: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', status: 'andamento', descricao: 'algum concurso' },
      { id: '6', nome: 'Concurso 2', status: 'andamento', descricao: 'algum concurso' },
      { id: '7', nome: 'Concurso 3', status: 'previsto', descricao: 'algum concurso' },
      { id: '8', nome: 'Um outro tipo de texto para outro teste', status: 'previsto', descricao: 'algum concurso' },
      { id: '9', nome: 'Testando carga de concursos', status: 'previsto', descricao: 'algum concurso' }
    ];
    this.filteredConcursos = this.allConcursos;
  }

  trackByStatus = (index: string, concurso: Concurso) => concurso.status;

  search = e => {
    const search = this.normalize(e.target.value);
    this.filteredConcursos = this.allConcursos.filter(concurso => {
      return this.normalize(concurso.nome).includes(search) || this.normalize(concurso.status).includes(search);
    });
  };

  clear = () => {
    this.filteredConcursos = this.allConcursos;
  };

  showDetails = () => {
    this.navCtrl.push('ConcursoDetailsPage');
  };

  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
