import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Destination, DocumentsToSendService } from '../../state';
import deburr from 'lodash-es/deburr';

@IonicPage({
  segment: 'documentos-para-enviar-adicionar-destinatario'
})
@Component({
  selector: 'documents-to-send-add-addressees',
  templateUrl: './documents-to-send-add-addressees.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendAddAddresseesPage implements OnInit {
  
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: DocumentsToSendService) {
    this.service.getDestinations().subscribe(destination => {
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
      return this.normalize(agency.descricao).includes(search);
    });
  };

  /**
   *
   */
  clear() {
    this.filteredGovAgencies = [...this.govAgencies];
  };

  /**
   *
   */
  addAddressees(agency: Destination) {
    if (this.addressees.findIndex(ad => ad.id === agency.id) === -1 ){
      agency.tipo = 'Órgão'
      this.addressees.push(agency);
    }
    
    this.navCtrl.pop();
  }

  limite(valor: string) {
    if (valor.length > 35) {
      return valor.substring(0, 35) + '…';
    } else {
      return valor;
    }
  };


  ngOnInit(): void {}

  refresh(): void {}

  isValidNumber(value: any) {
    return typeof value === 'number' && !isNaN(value);
  }

  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
