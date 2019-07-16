import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  segment: 'documentos-para-enviar-adicionar-destinatarios'
})
@Component({
  selector: 'documents-to-send-add-addressees',
  templateUrl: './documents-to-send-add-addressees.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendAddAddresseesPage implements OnInit {
  // addressees: string = ''

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
  selAddresseesTypeFilter: {id: number; type: string; notice: string} = this.addresseesTypeFilter[0];
  
  govAgency: string = '';
  govSector: string = '';
  govGroups: string = '';

  constructor(public navCtrl: NavController) {}

  searchInput(event) {
    console.log(event);
  }

  ngOnInit(): void {}

  refresh(): void {}

  isValidNumber(value: any) {
    return typeof value === 'number' && !isNaN(value);
  }
}
