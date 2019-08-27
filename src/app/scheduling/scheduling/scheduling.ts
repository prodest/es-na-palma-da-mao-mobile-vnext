import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FormBase } from '@espm/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchedulingService } from '../providers/scheduling.service';
import { ListItem } from '../models/list-item.model';
import { TipoAgenda } from '../models/schedule-type.model';
import { tap } from 'rxjs/operators/tap';
import * as mascaras from '@espm/core/forms/masks/index';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-scheduling',
  templateUrl: 'scheduling.html'
})
export class SchedulingPage extends FormBase implements OnInit {
  @ViewChild(Slides) slides: Slides;
  category: number;
  categories$: Observable<ListItem[]>;
  services$: Observable<ListItem[]>;
  units$: Observable<ListItem[]>;
  schedule$: Observable<TipoAgenda>;
  schedule: TipoAgenda;
  serviceDetails: string;
  unitDetails: string;
  scheduleTimes: string[] = null;
  emailFocus = false;
  page: number = 1;
  loadingServiveDetails: boolean = false;

  phoneMask = mascaras.PHONE_MASK;

  private portalServiceId: number = null;
  private categories: ListItem[] = [];
  private services: ListItem[] = [];
  private units: ListItem[] = [];

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private schedulingService: SchedulingService,
    public alertController: AlertController,
    public keyboard: Keyboard
  ) {
    super(formBuilder);
  }

  validationMessages: {};

  protected createFormModel(): FormGroup {
    this.form = this.formBuilder.group({
      servico: this.formBuilder.control('', [Validators.required]),
      unidade: this.formBuilder.control('', [Validators.required]),
      data: this.formBuilder.control('', [Validators.required]),
      horaDesejada: this.formBuilder.control('', [Validators.required]),
      tipoDocumento: this.formBuilder.control('', [Validators.required]),
      documento: this.formBuilder.control('', [Validators.required]),
      nome: this.formBuilder.control('', [Validators.required]),
      telefone: this.formBuilder.control('', [this.validators.phone]),
      email: this.formBuilder.control('', []),
      codigo: this.formBuilder.control('', [])
    });

    return this.form;
  }

  ngOnInit() {
    this.categories$ = this.schedulingService.getCategories().pipe(tap((c: ListItem[]) => (this.categories = c)));
  }

  setPhoneValidator(e) {
    if (e === 'tel') {
      this.form.controls['telefone'].setValidators([this.validators.phone]);
      this.phoneMask = mascaras.PHONE_MASK;
    } else {
      this.form.controls['telefone'].setValidators([this.validators.cellphone]);
      this.phoneMask = mascaras.CELL_PHONE_MASK;
    }
    this.form.controls['telefone'].reset();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendamentoPage');
  }

  categorySelected(id: number) {
    this.clearService();
    this.category = id;
    this.services$ = this.schedulingService.getServices(id).pipe(tap((servicos: ListItem[]) => (this.services = servicos)));
    setTimeout(() => {
      this.next();
    }, 100);
  }

  serviceSelected(service: ListItem) {
    this.loadingServiveDetails = true;
    this.clearUnit();
    this.form.controls['servico'].setValue(service.id);
    this.units$ = this.schedulingService.getUnits(service.id).pipe(tap((unidades: ListItem[]) => (this.units = unidades)));
    this.portalServiceId = this.services.find(s => s.id === service.id).idServicoPortal;
    if (this.portalServiceId) {
      this.schedulingService
        .getServiceDetails(this.portalServiceId)
        .subscribe((d: String) => (this.serviceDetails = `<h2><b>${service.nome}</b></h2><hr>` + d.split('<style>')[0]));
    } else {
      this.serviceDetails = `<h2><b>${service.nome}</b></h2><hr>` + this.services.find(s => s.id === service.id).descricao;
    }

    this.loadingServiveDetails = false;
  }

  unitSelected(id: number) {
    this.clearScheduleData();
    this.form.controls['unidade'].setValue(id);
    this.unitDetails = this.units.find(u => u.id === id).descricao;
    this.schedule$ = this.schedulingService.getScheduleDetails(+this.form.controls['servico'].value, id).pipe(
      tap(agenda => {
        this.schedule = agenda;
        if (agenda.agenda.telefoneObrigatorio) {
          this.form.controls['telefone'].setValidators([Validators.required]);
        }
        if (agenda.agenda.emailObrigatorio) {
          this.form.controls['email'].setValidators([Validators.required]);
        }
      })
    );
  }

  dateSelected(data: string) {
    if (data[0] !== undefined) {
      this.form.controls['horaDesejada'].enable();
      this.form.controls['data'].setValue(data);
      this.schedulingService
        .getAvailableScheduleTimes(
          +this.form.controls['servico'].value,
          +this.form.controls['unidade'].value,
          this.form.controls['data'].value
        )
        .pipe(tap(console.log))
        .subscribe(h => (this.scheduleTimes = h));
    }
  }

  next() {
    if (this.page < 5) {
      this.page++;
    }
  }

  previous() {
    if (this.page > 1) {
      this.page--;
    }
  }

  checkEmail() {
    if (!this.form.controls['email'].value) {
      let alerta = this.alertController.create({
        title: 'Continuar sem inserir email?',
        message: 'Você não receberá o resumo do agendamento',
        buttons: [
          {
            text: 'Sim',
            handler: this.save
          },
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              console.log('cancelado');
            }
          }
        ]
      });
      alerta.present();
    } else {
      this.save();
    }
  }

  formatJson(dados): string {
    let texto = `
      Categoria: ${this.categories.find(c => c.id === this.category).nome}<br>
      Serviço: ${this.services.find(c => c.id === this.form.controls['servico'].value).nome}<br>
      Unidade: ${this.units.find(c => c.id === this.form.controls['unidade'].value).nome}<br>
      Data: ${new Date(this.form.controls['data'].value).toLocaleDateString()}<br>
      Hora: ${this.form.controls['horaDesejada'].value}<br>
      Tipo de documento: ${
        this.schedule.agenda.tiposDocumentos.find(t => t.id === this.form.controls['tipoDocumento'].value).nome
      }<br>
      Numero do documento: ${this.form.controls['documento'].value}<br>
      Nome: ${this.form.controls['nome'].value}<br>
      `;
    if (this.schedule.agenda.emailObrigatorio) {
      texto += `Email: ${this.form.controls['email'].value}<br>`;
    }
    if (this.schedule.agenda.telefoneObrigatorio) {
      texto += `Telefone: ${this.form.controls['telefone'].value}<br>`;
    }
    if (this.form.controls['codigo'].value) {
      texto += `Código de agendamento: ${this.form.controls['codigo'].value}<br>`;
    }

    return texto;
  }

  save() {
    let alerta = this.alertController.create({
      title: 'Confira os dados',
      message: this.formatJson(this.form),
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.form.controls['codigo'].setValue(this.generateCode());
            this.schedulingService.save(this.form.value).subscribe(s => {
              if (this.form.controls['email'].value) {
                this.schedulingService.sendEmail(this.form.controls['email'].value, this.formatJson(this.form)).subscribe();
              }
              let alerta2 = this.alertController.create({
                title: 'Agendamento efetuado com sucesso.',
                message: this.formatJson(this.form),
                buttons: [
                  {
                    text: 'Ok'
                  }
                ]
              });
              alerta2.present();
            });
          }
        }
      ]
    });
    alerta.present();
  }

  clearService() {
    this.clearUnit();
    this.form.controls['servico'].reset();
    this.serviceDetails = null;
    this.services$ = null;
    this.services = null;
    this.portalServiceId = null;
  }

  clearUnit() {
    this.clearScheduleData();
    this.form.controls['unidade'].reset();
    this.units$ = null;
    this.units = null;
    this.unitDetails = null;
  }

  clearScheduleData() {
    this.form.controls['horaDesejada'].disable();
    this.form.controls['horaDesejada'].reset();
    this.form.controls['data'].reset();
    this.scheduleTimes = null;
    this.schedule = null;
    this.schedule$ = null;
  }

  generateCode() {
    let texto = '';
    const possiveis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++) {
      texto += possiveis.charAt(Math.floor(Math.random() * possiveis.length));
    }
    return texto;
  }

  focus(e) {
    console.log(e);
  }
}
