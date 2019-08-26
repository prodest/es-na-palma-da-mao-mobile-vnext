import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, IonicPage, Events, ModalController, Modal } from 'ionic-angular';
import { Destination, TipoDestino } from '../../state';

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
      id: TipoDestino.Orgao,
      type: 'Somente órgão',
      notice:
        'Ao enviar para uma organização, apenas o responsável pela organização (e pessoas explicitamente autorizadas por ele no Acesso Cidadão) terão acesso ao trâmite.'
    },
    {
      id: TipoDestino.Setor,
      type: 'Setor',
      notice:
        'Ao enviar para um setor, apenas o responsável pelo setor (e pessoas explicitamente autorizadas por ele no Acesso Cidadão) terão acesso ao trâmite.'
    },
    {
      id: TipoDestino.GrupoDeTrabalho,
      type: 'Grupos de Trabalho',
      notice: 'Ao enviar para um grupo, TODOS os membros do grupo terão acesso ao trâmite.'
    }
  ];
  selAddresseesTypeFilter: { id: number; type: string; notice: string } = this.addresseesTypeFilter[0];

  addressees: Destination[] = [];
  govAgency: Destination;
  govDestination: Destination;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private modal: ModalController,
    private cdr: ChangeDetectorRef
  ) {}

  addAddressees() {   

    let destination: Destination;

    if(this.selAddresseesTypeFilter.id === 0){
      destination = this.govAgency;
    }else {
      destination = this.govDestination;
    }
    
    if (this.addressees.findIndex(ad => ad.id === destination.id) === -1) {
      this.events.publish('documents-to-send-add-addressess:add', {
        ...destination
      });
    }
    this.navCtrl.pop();
  }

  ngOnInit(): void {
    this.addressees = this.navParams.data;
  }

  refresh(): void {}

  isValidNumber(value: any) {
    return typeof value === 'number' && !isNaN(value);
  }

  changes() {
    this.cdr.detectChanges();
  }

  openSearch(tipo: number) {
    
    const data = {
      addAddressees: this.addAddressees,
      tipo: tipo,
      agency: null,
    }

    if(tipo !== TipoDestino.Orgao){
      data.agency = this.govAgency.id;      
    } 

    const searchModal: Modal = this.modal.create('DocumentsToSendAddresseesSearchComponent', data);
    
    searchModal.present();

    searchModal.onDidDismiss( data => {
      if(tipo === TipoDestino.Orgao) {
        this.govAgency = data;
      } else {
        this.govDestination = data;
      }
    })
  }
}
