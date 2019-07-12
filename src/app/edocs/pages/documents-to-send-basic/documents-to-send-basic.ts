import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IonicPage, Loading } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { AuthService, CidadaoRole, AcessoCidadaoClaims, LoadingService } from '@espm/core';

@IonicPage({
  segment: 'documentos-para-enviar-basico'
})
@Component({
  selector: 'edocs-documents-to-send-basic',
  templateUrl: './documents-to-send-basic.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendBasicPage implements OnInit {

  documents = [];
  sender$: Observable<AcessoCidadaoClaims>;
  roles$: Observable<CidadaoRole[]>;
  private loading: Loading;
  private loadCount = 0;

  constructor(private auth: AuthService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    let loadEndIn = 2;
    this.loading = this.loadingService.show('Aguarde');
    // buscando dados na api (sender e roles)
    this.sender$ = this.auth.refreshUser().pipe(
      finalize(this.dismissLoading.bind(this, loadEndIn))
    );
    this.roles$ = this.auth.getUserRoles().pipe(
      finalize(this.dismissLoading.bind(this, loadEndIn))
    );
  }

  refresh(): void { }

  submitForm(value: any): void {
    // TODO: comportamento wizard (next step)
    console.log({ value })
  }

  /**
   * @description este método tem a função de encerrar o loading infinito
   * quando finalizar o processamento assíncrono de buscar os dados
   * na api do acesso cidadão
   * @author David Vilaça
   * @date 2019-07-12
   * @private
   * @param {number} len número de observables
   * @memberof DocumentsToSendBasicPage
   */
  private dismissLoading(len: number): void {
    if (++this.loadCount === len) {
      this.loading.dismiss()
    }
  }

  // private onError(_: any): void {
  //   // TODO: redirecionar ou deixar wizard desabilitado
  // }
}
