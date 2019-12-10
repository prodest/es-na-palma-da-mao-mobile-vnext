import { Component, ChangeDetectorRef, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { trackById } from '@espm/core';
import deburr from 'lodash-es/deburr';
import { NavController, NavParams } from 'ionic-angular';
import { IPaystubLink } from '../../interfaces';

@Component({
  selector: 'paystub-links',
  templateUrl: 'paystub-links.component.html',
})
export class PaystubLinksComponent implements OnInit, OnChanges {

  @Input() links: IPaystubLink[] = []
  @Output() onSelectLink: EventEmitter<IPaystubLink> = new EventEmitter();

  filteredLinks: IPaystubLink[];

  trackById = trackById

  constructor(public navCtrl: NavController, public navParams: NavParams, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filteredLinks = this.links || [];
    this.cdr.detectChanges()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('links' in changes) {
      this.filteredLinks = this.links || [];
      this.cdr.detectChanges()
    }
  }

  ionViewDidLoad(): void {
    // this.filteredLinks = this.allLinks$;
    // console.log('Links: ', this.filteredLinks)
  }

  linksSort(links: any[]) {

  }

  selectLink(link: IPaystubLink) {
    this.onSelectLink.emit(link);
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

    this.filteredLinks = this.links.filter(link => {
      return this.normalize(link.orgao).includes(search) || this.normalize(link.situacao).includes(search);
    });
  };

  clear = () => {
    this.filteredLinks = [...this.links];
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
