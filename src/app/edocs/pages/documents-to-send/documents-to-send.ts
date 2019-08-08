import { Component, ChangeDetectionStrategy, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, Slides, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import {
  IBaseStepOutput,
  IAddresseesStepOutput,
  IDocStepOutput,
  IMessageOutput,
  IDocumentsToSendWizardValue
} from '../../interfaces';
import { WizardStep } from '../../providers';
import {
  DocumentsToSendBasicComponent,
  DocumentsToSendAddresseesComponent,
  DocumentsToSendDocComponent,
  DocumentsToSendMessageComponent
} from '../../components';
import { dev } from '@espm/core/environment/environment.dev';
import { ForwardPostBody, Destination, DocumentsToSendService, DocumentsToSendQuery, WizardSteps } from '../../state';

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
  // file path
  file: string;
  // active step
  activeStep: WizardStep<any>;

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

  constructor(private navParams: NavParams, private service: DocumentsToSendService, private query: DocumentsToSendQuery) {}

  nextSlide() {
    this.activeStep.submit();
    if (this.activeStep instanceof DocumentsToSendBasicComponent) {
      this.activeStep = this.addresseesStep;
    } else if (this.activeStep instanceof DocumentsToSendAddresseesComponent) {
      this.activeStep = this.docStep;
    } else if (this.activeStep instanceof DocumentsToSendDocComponent) {
      this.activeStep = this.messageStep;
    }

    // this.service.storeUpdate(this.activeStep, WizardSteps.ACTIVE);
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);

    ////
    this.query.getWizardState().subscribe(query => console.log('NextSlide Query', query));
  }

  prevSlide() {
    if (this.activeStep instanceof DocumentsToSendAddresseesComponent) {
      this.activeStep = this.basicStep;
    } else if (this.activeStep instanceof DocumentsToSendDocComponent) {
      this.activeStep = this.addresseesStep;
    } else if (this.activeStep instanceof DocumentsToSendMessageComponent) {
      this.activeStep = this.docStep;
    }

    // this.service.storeUpdate(this.activeStep, WizardSteps.ACTIVE);
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  ngOnInit(): void {
    ////
    console.log(dev.api.edocs);
    // this.query.getWizardState().subscribe(query => {
    //   if (query.addresseesStepState) {
    //     this.stepsValue.addresseesStep = query.addresseesStepState;
    //   }
    //   if (query.basicStepState) {
    //     this.stepsValue.basicStep = query.basicStepState;
    //   }
    //   if (query.docStepState) {
    //     this.stepsValue.docStep = query.docStepState;
    //   }
    //   if (query.messageStepState) {
    //     this.stepsValue.messageStep = query.messageStepState;
    //   }
    //   ////
    //   console.log(this.stepsValue);
    // });

    this.subscriptions = [
      this.basicStep.onComplete.subscribe((value: IBaseStepOutput) => {
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
    // console.log('ACTIVE ', this.activeStep)
    // this.service.storeUpdate(this.activeStep, WizardSteps.ACTIVE);
    this.file = this.navParams.get('filePath');
    this.file = 'file.pdf'; // UNCOMENT TO TEST AND DEBUG WITH IONIC SERVE (BROWSER PLATFORM)
    this.slides.lockSwipes(true);
  }

  refresh(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => (sub ? sub.unsubscribe() : void 0));
  }

  private send(): void {
    let body: ForwardPostBody;

    body = {
      titulo: this.stepsValue.basicStep.titleForward,
      destinosIds: this.stepsValue.addresseesStep.map((dest: Destination) => {
        return dest.id;
      }),
      conteudo: this.stepsValue.messageStep.message,
      documentosIds: [process.env.DOC_ID],
      encaminhamentoAnteriorId: null,
      enviarEmailNotificacoes: this.stepsValue.basicStep.notification,
      responsavelId: this.stepsValue.basicStep.role
    };

    ////
    this.query.getWizardState().subscribe(query => console.log('Query Send', query));

    console.log(`Body: `, { body: body });

    // console.log('TODO: ENVIAR ARQUIVOS PARA API(S)')
    // console.log({ stepsValue: this.stepsValue})

    // console.log(this.service);
    // this.service.createForwards(body).subscribe(
    //   retorno => console.log(retorno)
    // );
  }
}
