import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
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
export class DocumentsToSendAddresseesSearchComponent {
  govDestinations: Destination[] = [];
  filteredGovDestinations: Destination[];
  nomeTipoDestino: string;
  agentePublico: boolean;

  constructor(
    private navParams: NavParams,
    private service: DocumentsToSendService,
    private view: ViewController,
    private cdr: ChangeDetectorRef,
  ) { }

  ionViewWillLoad(): void {
    this.agentePublico = this.navParams.data.agentePublico;
    this.nomeTipoDestino = this.navParams.data.nomeTipo;
    this.service
      .getDestinations(parseInt(this.navParams.data.tipo, 10), this.navParams.data.agency)
      .pipe(
        map(destinations =>
          destinations.map(dest => {
            let destination: Destination;

            if (parseInt(this.navParams.data.tipo, 10) === TipoDestino.GrupoDeTrabalho) {
              destination = {
                ...dest,
                nome: dest.descricao,
                descricao: '',
                tipo: TipoDestino[parseInt(this.navParams.data.tipo, 10)]
              };
            } else {
              const descriptionSplited = dest.descricao.split('-');
              destination = {
                ...dest,
                nome: descriptionSplited[0].trim(),
                descricao: descriptionSplited[1].trim(),
                tipo: TipoDestino[parseInt(this.navParams.data.tipo, 10)]
              };
            }

            return destination;
          })
        )
      )
      .subscribe(destination => {
        this.govDestinations = this.filteredGovDestinations = destination;
        this.cdr.detectChanges();
      });
  }

  clear() {
    this.filteredGovDestinations = [...this.govDestinations];
  }

  search(e: any) {
    const search = this.normalize(e.target.value);
    this.filteredGovDestinations = this.govDestinations.filter(agency => {
      return this.normalize(agency.descricao).includes(search) || this.normalize(agency.nome).includes(search);
    });
  }

  closeModal(data: any): void {
    this.view.dismiss(data);
  }

  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
