import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage, ViewController } from 'ionic-angular';
import { DocumentsToSendService, Destination } from '../../state';
import deburr from 'lodash-es/deburr';
import { map } from 'rxjs/operators';

@IonicPage({
  segment: 'documentos-para-enviar-adicionar-destinatario'
})
@Component({
  selector: 'edocs-documents-to-send-add-addressees',
  templateUrl: './documents-to-send-add-addressees.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendAddAddresseesComponent implements OnInit {

  addresseesTypeFilter = [
    {
      id: 0,
      type: 'Somente órgão',
      notice:
        'Ao enviar para uma organização, apenas o responsável pela organização (e pessoas explicitamente autorizadas por ele no Acesso Cidadão) terão acesso ao trâmite.'
    },
    {
      id: 1,
      type: 'Setor',
      notice:
        'Ao enviar para um setor, apenas o responsável pelo setor (e pessoas explicitamente autorizadas por ele no Acesso Cidadão) terão acesso ao trâmite.'
    },
    {
      id: 2,
      type: 'Grupos de Trabalho',
      notice: 'Ao enviar para um grupo, TODOS os membros do grupo terão acesso ao trâmite.'
    }
  ];
  selAddresseesTypeFilter: { id: number; type: string; notice: string } = this.addresseesTypeFilter[0];

  addressees: Destination[] = [];
  govAgencies: Destination[] = [];
  filteredGovAgencies: Destination[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: DocumentsToSendService, private view: ViewController) {
    this.service.getDestinations()
    .pipe(
      map(destinations => destinations.map(dest => {
        const descriptionSplited = dest.descricao.split('-');
        const destination: Destination = {
          ...dest,
          nome: descriptionSplited[0].trim(),
          descricao: descriptionSplited[1].trim()
        };
        return destination
      }))
    )
    .subscribe(destination => {
      this.govAgencies = this.filteredGovAgencies = destination;
    });
    this.addressees = this.navParams.data;
  }

  /**
   *
   */
  search(e) {
    const search = this.normalize(e.target.value);
    this.filteredGovAgencies = this.govAgencies.filter(agency => {
      return this.normalize(agency.descricao).includes(search) || this.normalize(agency.nome).includes(search);;
    });
  }

  /**
   *
   */
  clear() {
    this.filteredGovAgencies = [...this.govAgencies];
  }

  /**
   *
   */
  closeModal(agency?: Destination) {
    this.view.dismiss(agency);
  }

  limite(valor: string) {
    if (valor.length > 35) {
      return valor.substring(0, 35) + '…';
    } else {
      return valor;
    }
  }

  ngOnInit(): void { }

  isValidNumber(value: any) {
    return typeof value === 'number' && !isNaN(value);
  }

  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
