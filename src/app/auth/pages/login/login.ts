import { Component, Inject, OnInit } from '@angular/core';
import { AcessoCidadaoClaims as User, AuthQuery, AuthService } from '@espm/core';
import { Environment, EnvVariables } from '@espm/core/environment';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { AlertController, IonicPage, LoadingController, NavController, Platform, ToastController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  /**
   *
   */
  username: string | undefined;
  password: string | undefined;
  readonly errorMsgs = {
    accountNotLinked: 'User not found.' // Verification message with AcessoCidadao
  };

  private redirect: {
    to?: string,
    params?: { [key: string]: any }
  } = {};

  /**
   * Creates an instance of LoginPage.
   */
  constructor(
    private iab: InAppBrowser,
    private auth: AuthService,
    private authQuery: AuthQuery,
    private platform: Platform,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private navParams: NavParams,
    @Inject(EnvVariables) private environment: Environment
  ) { }

  ngOnInit() {
    this.redirect = {
      to: this.navParams.get('redirectTo'),
      params: {
        filePath: this.navParams.get('filePath')
      }
    };
  }

  /**
   * ref: https://github.com/ionic-team/ionic/issues/11459#issuecomment-365224107
   *
   */
  ionViewCanEnter(): boolean | Promise<any> {
    const isAllowed = !this.authQuery.isLoggedIn;

    if (!isAllowed) {
      setTimeout(this.goToDashboard, 0);
    }
    return isAllowed;
  }

  /**
   * Executa login na aplicação de acordo com as configurações do settings, usuário e senha.
   */
  login = (username?: string, password?: string) => {
    if (!username || !password) {
      this.toastCtrl.create({ message: 'Login e senha são obrigatórios' }).present();
      return;
    }

    this.loginWith(() => this.auth.acessoCidadaoLogin(username, password));
  };

  /**
   * Realiza o login usando o facebook
   * https://github.com/jeduan/cordova-plugin-facebook4
   */
  facebookLogin = () => this.loginWith(() => this.auth.facebookLogin());

  /**
   * Realiza o login usando conta do google
   */
  googleLogin = () => this.loginWith(() => this.auth.googleLogin());

  /**
   * Abre a janela(no browser) de recuperar senha do acesso cidadão.
   */
  openUrlForgotPassword = () => this.openInAppBrowser(`${this.environment.api.acessocidadao}/Conta/SolicitarReinicioSenha`);

  /************************************* Private API *************************************/

  /**
   *
   *
   */
  private loginWith = (loginMethod: () => Observable<User>) => {
    const loading = this.loadingCtrl.create({ content: 'Autenticando' });
    loading.present().then(() => {
      loginMethod()
        .pipe(finalize(() => loading.dismiss()))
        .subscribe(this.redirectHandler, this.onLoginError);
    });
  };

  /**
   * Callback de erro no login no acesso cidadão.
   *
   */
  private onLoginError = (error: { data?: { error: string } }): void => {
    if (error.data && this.isAccountNotLinkedError(error.data)) {
      this.showDialogAccountNotLinked();
    }
  };

  /**
   *
   *
   */
  private showDialogAccountNotLinked = (): void => {
    let alert = this.alertCtrl.create({
      title: 'Conta não vinculada',
      message: 'Acesse utilizando o usuário e senha ou clique para criar uma nova conta',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Criar conta',
          handler: () => {
            this.openInAppBrowser(`${this.environment.api.acessocidadao}Conta/VerificarCPF`);
          }
        }
      ]
    });
    alert.present();
  };

  /**
   *
   *
   */
  private isAccountNotLinkedError = (data): boolean => data.error === this.errorMsgs.accountNotLinked;

  private redirectHandler = () => this.redirect && this.redirect.to ?
    this.navCtrl.setRoot(this.redirect.to, this.redirect.params) :
    this.goToDashboard()

  /**
   * Redireciona usuário para o dashboard
   */
  private goToDashboard = () => this.navCtrl.setRoot('DashboardPage');

  /**
   *
   *
   */
  private openInAppBrowser = (url: string): void => {
    let options = 'toolbar=no,location=no,clearcache=yes,clearsessioncache=yes,closebuttoncaption=Cancelar';
    // ios ou android
    let browser: InAppBrowserObject = this.iab.create(
      `${url}?espmplatform=${this.platform.platforms().join(',')}`,
      '_blank',
      options
    );

    browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
      if (event.url === this.environment.api.acessocidadao) {
        browser.close();
      }
    });
    browser.on('loaderror').subscribe((event: InAppBrowserEvent) => browser.close());
  };

  /**
   * Redireciona para 1ª tela do processo de criação de conta
   */
  public createAccount(): void {
    this.openInAppBrowser(`${this.environment.api.acessocidadao}/Conta/VerificarCPF`);
  }
}
