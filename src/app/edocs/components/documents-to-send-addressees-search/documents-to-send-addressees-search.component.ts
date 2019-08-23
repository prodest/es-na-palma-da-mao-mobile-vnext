import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Destination, DocumentsToSendService, TipoDestino } from '../../state';
import { map } from 'rxjs/operators';
import { NavParams, IonicPage, ViewController } from 'ionic-angular';
import deburr from 'lodash-es/deburr';

@IonicPage({
  segment: 'documentos-para-enviar-adicionar-destinatario-busca'
})
@Component({
  selector: 'edocs-documents-to-send-addressees-search',
  templateUrl: './documents-to-send-addressees-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsToSendAddresseesSearchComponent implements OnInit {
  addressees: Destination[] = [];
  govAgencies: Destination[] = [];
  filteredGovAgencies: Destination[];

  constructor(private navParams: NavParams, private service: DocumentsToSendService, private view: ViewController) {}

  ngOnInit(): void {
    this.service
      .getDestinations(parseInt(this.navParams.data.tipo, 10  ), this.navParams.data.agency)
      .pipe(
        map(destinations =>
          destinations.map(dest => {
            let destination: Destination;

            if (parseInt(this.navParams.data.tipo, 10) === TipoDestino.GrupoDeTrabalho){
              destination = {
                ...dest,
                nome: dest.descricao,
                descricao: '',
                tipo: TipoDestino[parseInt(this.navParams.data.tipo, 10  )],
              }
            } else {
              const descriptionSplited = dest.descricao.split('-');
              destination = {
                ...dest,
                nome: descriptionSplited[0].trim(),
                descricao: descriptionSplited[1].trim(),
                tipo: TipoDestino[parseInt(this.navParams.data.tipo, 10  )],
              }
            }
            
            return destination;
          })
        )
      )
      .subscribe(destination => {
        this.govAgencies = this.filteredGovAgencies = destination;
      });
    this.addressees = this.navParams.data.addressees;
  }

  clear() {
    this.filteredGovAgencies = [...this.govAgencies];
  }

  search(e: any) {
    const search = this.normalize(e.target.value);
    this.filteredGovAgencies = this.govAgencies.filter(agency => {
      return this.normalize(agency.descricao).includes(search) || this.normalize(agency.nome).includes(search);;
    });
  }

  limite(valor: string) {
    if (valor.length > 35) {
      return valor.substring(0, 35) + '…';
    } else {
      return valor;
    }
  }

  refresh(): void {}

  closeModal(data: any): void {
    this.view.dismiss(data);
  }

  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
