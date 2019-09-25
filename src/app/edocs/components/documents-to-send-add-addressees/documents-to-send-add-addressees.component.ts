import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage, ModalController, Modal, ViewController } from 'ionic-angular';
import { Destination, TipoDestino } from '../../state';

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
      id: TipoDestino.Orgao,
      type: 'Órgão',
      notice:
        'Ao enviar para uma organização, apenas o responsável pela organização (e pessoas explicitamente autorizadas por ele no Acesso Cidadão) terão acesso ao trâmite.',
      restrict: false
    },
    {
      id: TipoDestino.Setor,
      type: 'Setor',
      notice:
        'Ao enviar para um setor, apenas o responsável pelo setor (e pessoas explicitamente autorizadas por ele no Acesso Cidadão) terão acesso ao trâmite.',
      restrict: true
    },
    {
      id: TipoDestino.GrupoDeTrabalho,
      type: 'Grupo de Trabalho',
      notice: 'Ao enviar para um grupo, TODOS os membros do grupo terão acesso ao trâmite.',
      restrict: true
    }
  ];
  noticeAgency: string = "Primeiro escolha um Órgão."
  selAddresseesTypeFilter: { id: number; type: string; notice: string } = this.addresseesTypeFilter[0];

  govAgency: Destination;
  govDestination: Destination;
  tipoPesquisa: string = this.selAddresseesTypeFilter.type;

  agentePublico: boolean;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modal: ModalController,
    private cdr: ChangeDetectorRef,
    private view: ViewController
  ) { }

  ngOnInit(): void {
    this.agentePublico = this.navParams.data.agentePublico;
  }

  closeModal() {
    let destination: Destination;

    if (this.selAddresseesTypeFilter.id === 0) {
      destination = this.govAgency;
    } else {
      destination = this.govDestination;
      destination.orgaoNome = this.govAgency.nome;
    }
    this.view.dismiss(destination);
  }

  isValidNumber(value: any) {
    return typeof value === 'number' && !isNaN(value);
  }

  changes() {
    this.tipoPesquisa = this.selAddresseesTypeFilter.type;
    this.cdr.detectChanges();
  }

  openSearch(tipo: number) {

    const data = {
      tipo: tipo,
      nomeTipo: this.addresseesTypeFilter[tipo].type,
      agency: null,
      agentePublico: this.agentePublico
    }

    if (tipo !== TipoDestino.Orgao) {
      data.agency = this.govAgency.id;
    }

    const searchModal: Modal = this.modal.create('DocumentsToSendAddresseesSearchComponent', data);

    searchModal.present();

    searchModal.onDidDismiss(data => {
      if (tipo === TipoDestino.Orgao) {
        this.govAgency = data;
      } else {
        this.govDestination = data;
      }
    })
  }
}
