import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { Loading } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { AuthService, CidadaoRole, AcessoCidadaoClaims, LoadingService } from '@espm/core';
import { WizardStep } from '../../providers';
import { IBaseStepOutput } from '../../interfaces';
import { DocumentsToSendBasicFormComponent } from '../documents-to-send-basic-form';

@Component({
  selector: 'edocs-documents-to-send-basic',
  templateUrl: './documents-to-send-basic.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendBasicComponent extends WizardStep<IBaseStepOutput> implements OnInit {

  // documents = [];
  sender$: Observable<AcessoCidadaoClaims>;
  roles$: Observable<CidadaoRole[]>;
  notification$: boolean = true;

  @ViewChild('basicForm') protected form: DocumentsToSendBasicFormComponent;
  private loading: Loading;
  private loadCount = 0;

  constructor(private auth: AuthService, private loadingService: LoadingService) {
    super();
  }

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

}
