import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { trackById } from '@espm/core';
import deburr from 'lodash-es/deburr';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'paystub-links',
  templateUrl: 'paystub-links.component.html',
})
export class PaystubLinksComponent implements OnInit {

  allLinks$ = [
    {
      numero_vinculo: 4,
      orgao: 'PRODEST',
      situacao: 'ativo',
      tipo_vinculo: 'REQUISITADO',
      data_inicio: '14/03/2016',
      data_vacancia: '-',
      data_apos: '-'
    },
    {
      numero_vinculo: 3,
      orgao: 'SEGER',
      situacao: 'inativo',
      tipo_vinculo: 'REQUISITADO',
      data_inicio: '01/09/2011',
      data_vacancia: '-',
      data_apos: '-'
    },
    {
      numero_vinculo: 2,
      orgao: 'SEDU',
      situacao: 'ativo',
      tipo_vinculo: 'REQUISITADO',
      data_inicio: '26/05/2014',
      data_vacancia: '-',
      data_apos: '-'
    },
    {
      numero_vinculo: 1,
      orgao: 'SEGER',
      situacao: 'desligado',
      tipo_vinculo: 'REQUISITADO',
      data_inicio: '26/05/2012',
      data_vacancia: '-',
      data_apos: '-'
    }
  ]

  filteredLinks: any[];

  trackById = trackById

  constructor(public navCtrl: NavController, public navParams: NavParams, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.allLinks$.sort((a, b) => {
      // critério 1: situação ativo
      const crit1 = a.situacao === 'ativo' ? -1 : 1;
      // critério 2: data de início maior na frente
      const crit2 = a.data_inicio > b.data_inicio ? 1 : -1;
      return a.situacao === b.situacao ? crit2 : crit1;
    });
    this.filteredLinks = this.allLinks$;
    this.cdr.detectChanges()
    // console.log('Links: ', this.filteredLinks)
  }

  ionViewDidLoad(): void {
    // this.filteredLinks = this.allLinks$;
    // console.log('Links: ', this.filteredLinks)
  }

  linksSort(links: any[]) {

  }

  showLink(id) {
    this.navCtrl.push('ConcursoPage', { id });
  }

  search = e => {
    const search = this.normalize(e.target.value);

    // se o texto da pesquisa estiver vazio, exibe tudo
    // if (search.length === 0) this.updateConcursos(this.allLinks$);

    // // artibui o resultado da busca ao Subject de concursos
    // this.updateConcursos(
    //   // efetivamente faz a busca
    //   this.filteredLinks = this.allLinks.filter(concurso => {
    //     return this.normalize(concurso.orgao).includes(search) || this.normalize(concurso.descricao).includes(search);
    //   })
    // );

    this.filteredLinks = this.allLinks$.filter(link => {
      return this.normalize(link.orgao).includes(search) || this.normalize(link.situacao).includes(search);
    });
  };

  clear = () => {
    this.filteredLinks = [...this.allLinks$];
  };

  // tamanho do nome "orgão" limitado
  limite = (valor) => {
    if (valor.length > 12) {
      return valor.substring(0, 12) + "…";
    } else {
      return valor;
    }
  }

  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');

}
