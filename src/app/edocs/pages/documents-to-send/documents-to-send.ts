import { Component, ChangeDetectionStrategy, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, Slides, NavParams, Loading, AlertController, NavController, App, MenuController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { mergeMap } from 'rxjs/operators';
import { LoadingService, AuthQuery } from '@espm/core';
import {
  IBaseStepOutput,
  IAddresseesStepOutput,
  IDocStepOutput,
  IMessageOutput,
  IDocumentsToSendWizardValue
} from '../../interfaces';
import { WizardStep, DocumentsToConvertService } from '../../providers';
import {
  DocumentsToSendBasicComponent,
  DocumentsToSendAddresseesComponent,
  DocumentsToSendDocComponent,
  DocumentsToSendMessageComponent
} from '../../components';
import { DestinationReceive, DocumentsToSendService, WizardSteps, DocumentFile, ConvertToPdfPostBody, HorizontalAlign, VerticalAlign } from '../../state';

@IonicPage({
  segment: 'documentos-para-enviar'
})
@Component({
  selector: 'documents-to-send',
  templateUrl: './documents-to-send.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendPage implements OnInit, OnDestroy {
  @ViewChild(Slides) slides: Slides;
  // file object
  file: DocumentFile
  // active step
  activeStep: WizardStep<any>;
  // if sending/forwarding document
  isSending: boolean = false
  // if current user is agente publico
  agentePublico: boolean;

  // private atributes
  // all wizard steps
  @ViewChild('basic') private basicStep: DocumentsToSendBasicComponent;
  @ViewChild('addressees') private addresseesStep: DocumentsToSendAddresseesComponent;
  @ViewChild('doc') private docStep: DocumentsToSendDocComponent;
  @ViewChild('message') private messageStep: DocumentsToSendMessageComponent;

  // all steps values on submit
  private stepsValue: IDocumentsToSendWizardValue = {};

  // subscriptions
  private subscriptions: Subscription[] = [];

  constructor(private navParams: NavParams,
    private service: DocumentsToSendService,
    private convertService: DocumentsToConvertService,
    private loadingService: LoadingService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private authQuery: AuthQuery,
    private menuCtrl: MenuController,
    protected appCtrl: App) { }

  ionViewCanEnter(): boolean | Promise<any> {
    // permite acesso à tela se autenticados
    const isAllowed = this.authQuery.isLoggedIn;
    if (!isAllowed) {
      this.showAuthNeededModal();
    }
    return isAllowed;
  }

  showAuthNeededModal = () => {
    let alert = this.alertCtrl.create({
      title: 'Login necessário',
      message: 'Você deve estar autenticado no <strong>ES na palma da mão</strong> para acessar essa funcionalidade.',
      buttons: [
        {
          text: 'Entendi',
          handler: () => {
            this.appCtrl
              .getRootNav()
              .setRoot('PresentationEdocsPage')
              .then(() => {
                alert.dismiss();
                this.menuCtrl.close();
              });
            return false;
          },
          role: 'cancel'
        },
        {
          text: 'Autenticar',
          handler: () => {
            this.appCtrl
              .getRootNav().push('LoginPage', { redirectTo: 'DocumentsToSendPage' })
              .then(() => {
                alert.dismiss();
                this.menuCtrl.close();
              });
            return false;
          }
        }
      ]
    });
    return alert.present();
  };

  nextSlide() {
    this.activeStep.submit();
    if (this.activeStep instanceof DocumentsToSendBasicComponent) {
      this.activeStep = this.addresseesStep;
    } else if (this.activeStep instanceof DocumentsToSendAddresseesComponent) {
      this.activeStep = this.docStep;
    } else if (this.activeStep instanceof DocumentsToSendDocComponent) {
      this.activeStep = this.messageStep;
    }

    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);

  }

  prevSlide() {
    if (this.activeStep instanceof DocumentsToSendAddresseesComponent) {
      this.activeStep = this.basicStep;
    } else if (this.activeStep instanceof DocumentsToSendDocComponent) {
      this.activeStep = this.addresseesStep;
    } else if (this.activeStep instanceof DocumentsToSendMessageComponent) {
      this.activeStep = this.docStep;
    }

    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  ngOnInit(): void {

    this.subscriptions = [
      this.basicStep.onComplete.subscribe((value: IBaseStepOutput) => {
        this.agentePublico = !!value.role;
        this.stepsValue.basicStep = value;
        this.service.storeUpdate(this.stepsValue.basicStep, WizardSteps.BASIC);
      }),
      this.addresseesStep.onComplete.subscribe((value: { addressees: IAddresseesStepOutput }) => {
        this.stepsValue.addresseesStep = value.addressees;
        this.service.storeUpdate(this.stepsValue.addresseesStep, WizardSteps.ADDRESSEES);
      }),
      this.docStep.onComplete.subscribe((value: IDocStepOutput) => {
        this.stepsValue.docStep = value;
        this.service.storeUpdate(this.stepsValue.docStep, WizardSteps.DOC);
      }),
      this.messageStep.onComplete.subscribe((value: IMessageOutput) => {
        this.stepsValue.messageStep = value;
        this.service.storeUpdate(this.stepsValue.messageStep, WizardSteps.MESSAGE);
        this.send();
      })
    ];
    this.activeStep = this.basicStep;
    this.file = this.navParams.get('docFile');
    // this.file = {url: 'file.pdf', name: 'file.pdf', type: 'application/pdf'} // UNCOMENT TO TEST AND DEBUG WITH IONIC SERVE (BROWSER PLATFORM)
    this.slides.lockSwipes(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => (sub ? sub.unsubscribe() : void 0));
  }

  private async send(): Promise<void> {
    if (this.isSending) {
      return;
    }
    const loading = this.loadingService.show('Encaminhando documento');

    if (this.stepsValue.docStep.file.type !== 'application/pdf') {
      const body: ConvertToPdfPostBody = {
        size: 'A4',
        landscape: false,
        horizontalAlign: HorizontalAlign.CENTER,
        verticalAlign: VerticalAlign.MIDDLE,
        image: this.stepsValue.docStep.file
      }

      const value: IDocStepOutput = {
        name: this.stepsValue.docStep.name,
        documentType: this.stepsValue.docStep.documentType,
        documentPaperType: this.stepsValue.docStep.documentPaperType,
        documentAssignType: this.stepsValue.docStep.documentAssignType,
        file: { ...this.stepsValue.docStep.file }
      };

      value.file.buffer = await this.convertService.convertTopdf(body).toPromise();

      this.stepsValue.docStep = value;
      this.service.storeUpdate(this.stepsValue.docStep, WizardSteps.DOC);
    }
    this.service.captureDocuments(this.stepsValue.docStep.name, {
      File: this.stepsValue.docStep.file,
      Assinar: false,
      // ClasseId: null, // deixar null pra cidadão
      Natureza: this.stepsValue.docStep.documentType,
      ValorLegal: this.stepsValue.docStep.documentPaperType
    }).pipe(
      mergeMap(res => this.service.createForwards({
        titulo: this.stepsValue.basicStep.titleForward,
        destinosIds: this.stepsValue.addresseesStep.map(
          (dest: DestinationReceive) => {
            return dest.id;
          }),
        conteudo: this.stepsValue.messageStep.message,
        documentosIds: [
          res.id
        ],
        encaminhamentoAnteriorId: null,
        enviarEmailNotificacoes: this.stepsValue.basicStep.notification,
        responsavelId: this.stepsValue.basicStep.role,
      }))
    ).subscribe(
      () => this.onSendSuccess(loading),
      err => this.onSendError(err, loading)
    );
  }

  private onSendSuccess(loading: Loading): void {
    loading.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Encaminhamento concluído',
      message: `O encaminhamento do documento "${this.stepsValue.docStep.name}" foi concluído com sucesso.`,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot('MyServicesPage');
            return true;
          }
        }
      ]
    });
    alert.present();
  }

  private onSendError(error: any, loading: Loading): void {
    console.error(error);
    loading.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Encaminhamento interrompido',
      message: `Ocorreu um erro ao tentar encaminhar o documento "${this.stepsValue.docStep.name}". Tente novamente mais tarde!`,
      enableBackdropDismiss: false,
      buttons: ['OK']
    });
    alert.present();
  }
}
