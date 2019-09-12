import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBase } from '@espm/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SchedulingService } from '../../providers/scheduling.service';
import { Observable } from 'rxjs/Observable';
import { ListItem } from '../../models/list-item.model';

@IonicPage()
@Component({
  selector: 'page-consult-scheduling',
  templateUrl: 'consult-scheduling.html',
})
export class ConsultSchedulingPage extends FormBase implements OnInit {
  result$: any;
  documentTypes$: Observable<ListItem[]>;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     private schedulingService: SchedulingService,
     public alertController: AlertController) {
    super(formBuilder);
  }

  validationMessages: {};

  protected createFormModel(): FormGroup {
    this.form = this.formBuilder.group({
      tipoDocumento: this.formBuilder.control('', [Validators.required]),
      documento: this.formBuilder.control('', [Validators.required]),
      codigo: this.formBuilder.control('', [Validators.required])
    });

    return this.form;
  }

  ngOnInit() {
    this.documentTypes$ = this.schedulingService.getDocumentTypes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultaAgendamentoPage');
  }

  find() {
    this.result$ = this.schedulingService.findScheduling(this.form.value);
  }

  cancel(id: string) {
    this.alertController.create({
      message: 'Tem certeza que deseja cancelar o atendimento?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.schedulingService.cancelScheduling(id).subscribe(() => {
              this.result$ = null;
              this.alertController.create({
                message: 'Agendamento cancelado.'
              }).present();
            });
          }
        },
        {
          text: 'Não',
          role: 'cancel'
        }
      ]
    }).present();

  }

}
