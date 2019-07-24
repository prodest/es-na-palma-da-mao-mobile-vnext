import { Component, ChangeDetectionStrategy, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, Slides, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { IBaseStepOutput, IAddresseesStepOutput, IDocStepOutput, IMessageOutput } from '../../interfaces';
import { WizardStep } from '../../providers';
import { DocumentsToSendBasicComponent, DocumentsToSendAddresseesComponent, DocumentsToSendDocComponent, DocumentsToSendMessageComponent } from '../../components';

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
  private stepsValue: {
    basic?: IBaseStepOutput;
    addressees?: IAddresseesStepOutput;
    doc?: IDocStepOutput;
    message?: IMessageOutput;
  } = {};

  // subscriptions
  private subscriptions: Subscription[] = [];

  constructor(private navParams: NavParams) { }

  nextSlide() {
    this.activeStep.submit();
    if (this.activeStep instanceof DocumentsToSendBasicComponent) {
      this.activeStep = this.addresseesStep;
    } else if (this.activeStep instanceof DocumentsToSendAddresseesComponent) {
      this.activeStep = this.docStep;
    } else if (this.activeStep instanceof DocumentsToSendMessageComponent) {
      this.activeStep = this.messageStep;
    }
    this.slides.slideNext();
  }

  prevSlide() {
    if (this.activeStep instanceof DocumentsToSendAddresseesComponent) {
      this.activeStep = this.basicStep;
    } else if (this.activeStep instanceof DocumentsToSendDocComponent) {
      this.activeStep = this.addresseesStep;
    } else if (this.activeStep instanceof DocumentsToSendMessageComponent) {
      this.activeStep = this.docStep;
    }
    this.slides.slidePrev();
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.basicStep.onComplete.subscribe(
        (value: IBaseStepOutput) => this.stepsValue.basic = value
      ),
      this.addresseesStep.onComplete.subscribe(
        (value: { addressees: IAddresseesStepOutput }) => this.stepsValue.addressees = value.addressees
      ),
      this.docStep.onComplete.subscribe(
        (value: IDocStepOutput) => this.stepsValue.doc = value
      ),
      this.messageStep.onComplete.subscribe(
        (value: IMessageOutput) => {
          this.stepsValue.message = value
          this.send();
        }
      )
    ];
    this.activeStep = this.basicStep;
    this.file = this.navParams.get('filePath');
    this.file = 'file.pdf';
  }

  refresh(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub ? sub.unsubscribe() : void 0);
  }

  private send(): void {
    console.log('TODO: ENVIAR ARQUIVOS PARA API(S)')
    console.log({ stepsValue: this.stepsValue})
  }
}
