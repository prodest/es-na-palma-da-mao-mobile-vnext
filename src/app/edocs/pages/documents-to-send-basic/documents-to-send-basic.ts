import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, Loading } from 'ionic-angular';
import { AuthService, FormBase, CidadaoRole, AcessoCidadaoClaims, LoadingService } from '@espm/core';

@IonicPage({
  segment: 'documentos-para-enviar-basico'
})
@Component({
  selector: 'documents-to-send-basic',
  templateUrl: './documents-to-send-basic.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendBasicPage extends FormBase implements OnInit {

  validationMessages = {
    title: {
      required: 'Obrigatório'
    },
    role: {
      required: 'Obrigatório'
    }
  };

  documents = [];
  roles: CidadaoRole[] = [];
  roleOptions = {
    title: 'Cargo / Função',
    subTitle: 'Selecione o cargo ou a função que deseja capturar e encaminhar o documento atual'
  }
  private sender: AcessoCidadaoClaims;
  private loading: Loading;

  constructor(formBuilder: FormBuilder, private auth: AuthService, private loadingService: LoadingService) {
    super(formBuilder)
  }

  ngOnInit(): void {
    this.loading = this.loadingService.show('Aguarde');
    this.getSender();
    this.getRoles();
  }

  refresh(): void { }

  protected createFormModel(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      sender: [{value: '', disabled: true}],
      role: ['', Validators.required]
    });
  }

  protected prepareFormModel(formModel: any): any {
    // trocando nome de exibição do remetente para seu id
    // na hora de enviar os dados
    formModel.sender = this.sender.subNovo;
    return formModel;
  }

  private getSender(): void {
    this.auth.refreshUser().subscribe(
      user => {
        const userControl = this.form.get('sender');
        userControl.patchValue(user.nome);
        this.sender = user;
      },
      err => this.onError(err)
    )
  }

  private getRoles(): void {
    this.auth.getUserRoles().subscribe(
      roles => {
        this.roles = roles;
        this.loading.dismiss();
      },
      err => this.onError(err)
    )
  }

  private onError(_: any): void {
    this.loading.dismiss();
    // TODO: redirecionar ou deixar wizard desabilitado
  }
}
