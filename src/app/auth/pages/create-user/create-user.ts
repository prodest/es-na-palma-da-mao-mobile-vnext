import { Component, Inject } from '@angular/core';
import { AcessoCidadaoClaims as User, AuthQuery, AuthService } from '@espm/core';
import { Environment, EnvVariables } from '@espm/core/environment';
import { AlertController, IonicPage, LoadingController, NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'login.html'
})
export class CreateUserPage {
  /**
   *
   */
  username: string | undefined;
  password: string | undefined;
  readonly errorMsgs = {
    accountNotLinked: 'User not found.' // Verification message with AcessoCidadao
  };

  /**
   * Creates an instance of LoginPage.
   */
  constructor(
    private auth: AuthService,
    private authQuery: AuthQuery,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    @Inject(EnvVariables) private environment: Environment
  ) { }

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
        .subscribe(this.goToDashboard);
    });
  };
  
  /**
   * Redireciona usuário para o dashboard
   */
  private goToDashboard = () => this.navCtrl.setRoot('DashboardPage');
}
