import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, Platform } from 'ionic-angular';
import { AuthService, AcessoCidadaoClaims, LoadingService } from '@espm/core';
import { ISiarhesProfile, ISiarhesLink, IPaystubYear, IReportYieldCompany } from '../../interfaces';
import { Observable } from 'rxjs/Observable';
import { mergeMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { SiarhesService } from '../../providers';
import { File, FileEntry } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@IonicPage({
  segment: 'rendimentos'
})
@Component({
  selector: 'report-yields',
  templateUrl: 'report-yields.html'
})
export class ReportYieldsPage implements OnInit {
  activeComponent: 'profile' | 'links' | 'download' = 'profile';
  profiles$: Observable<ISiarhesProfile[]> = of([]);
  links$: Observable<ISiarhesLink[]> = of([]);
  years$: Observable<IPaystubYear[]> = of([]);
  companies$: Observable<IReportYieldCompany[]> = of([]);
  currentUser: AcessoCidadaoClaims | undefined;
  currentProfile: ISiarhesProfile | undefined;
  currentLink: ISiarhesLink | undefined;
  currentYear: IPaystubYear | undefined;
  currentCompanies: IReportYieldCompany | undefined;

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
    const cpf = parseInt(this.currentUser.cpf, 10);
    this.activeComponent = 'download';
    this.currentLink = link;
    this.years$ = this.siarhesService
      .getReportYieldsYears(cpf, numeroFuncionario, numeroVinculo, numeroPensionista)
      .pipe(finalize(() => loading.dismiss()));
  }

  getCompanies(year?: IPaystubYear): void {
    if (!this.currentLink || !year) {
      return;
    }
    const loading = this.loading.show('Aguarde');
    const { numeroFuncionario } = this.currentProfile;
    const { numeroVinculo, numeroPensionista } = this.currentLink;
    const cpf = parseInt(this.currentUser.cpf, 10);
    this.activeComponent = 'download';
    this.currentYear = year;
    this.companies$ = this.siarhesService
      .getReportYieldsCompanies(cpf, numeroFuncionario, numeroVinculo, numeroPensionista, year)
      .pipe(finalize(() => loading.dismiss()));
  }

  download(companies?: IReportYieldCompany): void {

    if (!companies || !this.years$) {
      return;
    }
    this.currentCompanies = companies;

    const cpf = parseInt(this.currentUser.cpf, 10);
    const loading = this.loading.show('Aguarde');
    const { numeroFuncionario } = this.currentProfile;
    const { numeroVinculo, numeroPensionista } = this.currentLink;
    const { codigoEmpresa } = companies;
    const year = this.currentYear;
    this.activeComponent = 'download';

    this.siarhesService
      .getReportYields(
        cpf,
        numeroFuncionario,
        numeroVinculo,
        numeroPensionista,
        year,
        codigoEmpresa,
      )
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(pdf => {
        const blob = new Blob([pdf], { type: 'application/pdf' });

        let filePath = this.platform.is('android') ? this.file.externalRootDirectory + '/Download/' : this.file.documentsDirectory;
        let fileName = `informe_rendimento_${year}${codigoEmpresa}.pdf`

        // Write the file
        this.file.writeFile(filePath, fileName, blob, { replace: true })
          .then((fileEntry: FileEntry) => {
            this.navCtrl.pop();
            this.fileOpener
              .open(fileEntry.toURL(), 'application/pdf')
              .catch(err => {
                const alert = this.alertCtrl.create({
                  title: 'Erro',
                  subTitle: 'Não foi possível abrir o informe rendimento automaticamente. Tente abrí-lo manualmente ou clique em Baixar novamente.',
                  buttons: ['OK']
                })
                alert.present();
                throw err;
              });
          })
          .catch(err => {
            const alert = this.alertCtrl.create({
              title: 'Erro',
              subTitle: 'Não foi possível baixar o informe rendimento. Tente novamente mais tarde.',
              buttons: ['OK']
            })
            alert.present();
            throw err;
          });
      });
  }
}
