import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, Platform } from 'ionic-angular';
import { SiarhesService } from '../../providers';
import { AuthService, AcessoCidadaoClaims, LoadingService } from '@espm/core';
import { ISiarhesProfile, ISiarhesLink, IPaystubYear, IPaystubMonth, IPaystubPayroll } from '../../interfaces';
import { Observable } from 'rxjs/Observable';
import { mergeMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { File, FileEntry } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@IonicPage({
  segment: 'contracheque'
})
@Component({
  selector: 'paystub',
  templateUrl: 'paystub.html'
})
export class PaystubPage implements OnInit {
  activeComponent: 'profile' | 'links' | 'download' = 'profile';
  profiles$: Observable<ISiarhesProfile[]> = of([]);
  links$: Observable<ISiarhesLink[]> = of([]);
  years$: Observable<IPaystubYear[]> = of([]);
  months$: Observable<IPaystubMonth[]> = of([]);
  payrolls$: Observable<IPaystubPayroll[]> = of([]);
  currentUser: AcessoCidadaoClaims | undefined;
  currentProfile: ISiarhesProfile | undefined;
  currentLink: ISiarhesLink | undefined;
  currentYear: IPaystubYear | undefined;
  currentMonth: IPaystubMonth | undefined;
  currentPayroll: IPaystubPayroll | undefined;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    public alertCtrl: AlertController,
    private platform: Platform,
    private fileOpener: FileOpener,
    private siarhesService: SiarhesService,
    private auth: AuthService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    const loading = this.loading.show('Aguarde');
    this.auth
      .refreshAccessTokenIfNeeded()
      .pipe(mergeMap(() => this.auth.refreshUser()))
      .subscribe(user => {
        this.currentUser = user;
        this.getProfiles(loading);
      });
  }

  getProfiles(loading: Loading): void {
    if (!this.currentUser) {
      return;
    }
    this.profiles$ = this.siarhesService
      .getProfiles(this.currentUser.cpf)
      .pipe(finalize(() => loading.dismiss()));
  }

  getLinks(profile?: ISiarhesProfile): void {
    if (!profile) {
      return;
    }
    const loading = this.loading.show('Aguarde');
    this.activeComponent = 'links';
    this.currentProfile = profile;
    this.links$ = this.siarhesService
      .getLink(this.currentUser.cpf, profile.codigoPerfil, profile.numeroFuncionario)
      .pipe(finalize(() => loading.dismiss()));
  }

  getYears(link?: ISiarhesLink): void {
    if (!this.currentProfile || !link) {
      return;
    }
    const loading = this.loading.show('Aguarde');
    const { numeroFuncionario } = this.currentProfile;
    const { numeroVinculo, numeroPensionista } = link;
    this.activeComponent = 'download';
    this.currentLink = link;
    this.years$ = this.siarhesService
      .getPaystubYears(numeroFuncionario, numeroVinculo, numeroPensionista)
      .pipe(finalize(() => loading.dismiss()));
  }

  getMonths(year?: IPaystubYear): void {
    if (!this.currentLink || !year) {
      return;
    }
    const loading = this.loading.show('Aguarde');
    const { numeroFuncionario } = this.currentProfile;
    const { numeroVinculo, numeroPensionista } = this.currentLink;
    this.activeComponent = 'download';
    this.currentYear = year;
    this.months$ = this.siarhesService
      .getPaystubMonths(numeroFuncionario, numeroVinculo, year, numeroPensionista)
      .pipe(finalize(() => loading.dismiss()));
  }

  getPayrolls(month?: IPaystubMonth): void {
    if (!this.currentYear || !month) {
      return;
    }
    const loading = this.loading.show('Aguarde');
    const { numeroFuncionario } = this.currentProfile;
    const { numeroVinculo, numeroPensionista } = this.currentLink;
    const year = this.currentYear;
    this.activeComponent = 'download';
    this.currentMonth = month;
    this.payrolls$ = this.siarhesService
      .getPaystubPayroll(numeroFuncionario, numeroVinculo, year, month, numeroPensionista)
      .pipe(finalize(() => loading.dismiss()));
  }

  download(payroll?: IPaystubPayroll): void {

    if (!payroll || !this.currentMonth) {
      return;
    }
    this.currentPayroll = payroll;

    const loading = this.loading.show('Aguarde');
    const { numeroFuncionario, codigoPerfil } = this.currentProfile;
    const { numeroVinculo, numeroPensionista } = this.currentLink;
    const { empresaCodigo } = payroll;
    const year = this.currentYear;
    const month = this.currentMonth;
    this.activeComponent = 'download';
    this.currentMonth = month;

    this.siarhesService
      .getPaystub(
        numeroFuncionario,
        numeroVinculo,
        year,
        month,
        payroll.numeroFolha,
        empresaCodigo,
        codigoPerfil,
        numeroPensionista
      )
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(pdf => {
        const blob = new Blob([pdf], { type: 'application/pdf' });

        let filePath = this.platform.is('android') ? this.file.externalRootDirectory + '/Download/' : this.file.documentsDirectory;
        let fileName = `contracheque_${year}${month}${payroll.numeroFolha}.pdf`

        // Write the file
        this.file.writeFile(filePath, fileName, blob, { replace: true })
          .then((fileEntry: FileEntry) => {
            this.navCtrl.pop();
            this.fileOpener
              .open(fileEntry.toURL(), 'application/pdf')
              .catch(err => {
                const alert = this.alertCtrl.create({
                  title: 'Erro',
                  subTitle: 'Não foi possível abrir o contracheque automaticamente. Tente abrí-lo manualmente ou clique em Baixar novamente.',
                  buttons: ['OK']
                })
                alert.present();
                throw err;
              });
          })
          .catch(err => {
            const alert = this.alertCtrl.create({
              title: 'Erro',
              subTitle: 'Não foi possível baixar o contracheque. Tente novamente mais tarde.',
              buttons: ['OK']
            })
            alert.present();
            throw err;
          });
      });
  }
}
