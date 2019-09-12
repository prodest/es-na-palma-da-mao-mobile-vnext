import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicPage, MenuController, App, AlertController, NavParams, NavController } from 'ionic-angular';
import { AuthNeededService, AuthQuery } from '@espm/core';

@IonicPage({
  segment: 'captura-iniciada-por-mim'
})
@Component({
  selector: 'captured-by-me',
  templateUrl: './captured-by-me.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CapturedByMePage {
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authQuery: AuthQuery,
    private alertCtrl: AlertController,
    protected appCtrl: App,
    protected authNeeded: AuthNeededService,
    private menuCtrl: MenuController) {
  }
  ionViewCanEnter(): boolean | Promise<any> {
    // permite acesso à tela se autenticados
    const isAllowed = this.authQuery.isLoggedIn;

    if (!isAllowed) {
      this.showAuthNeededModal();
    }
    return isAllowed;
  }
  /**
   * 
   */
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
              this.navCtrl.push('PresentationEdocsPage')
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
              .getRootNav()
              this.navCtrl.push('LoginPage')
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
}
