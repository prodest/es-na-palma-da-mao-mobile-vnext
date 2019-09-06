import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, AlertController } from 'ionic-angular';
import { AuthNeededService, AuthQuery } from '@espm/core';


@IonicPage()
@Component({
  selector: 'page-presentation-edocs',
  templateUrl: 'presentation-edocs.html',
})
export class PresentationEdocsPage {
  menus = [
    {
      buttonTitle: 'Aguardando minha assinatura',
      targetPage: 'WaitingForMySignaturePage'
    },
    {
      buttonTitle: 'Assinei - aguardando os demais',
      targetPage: 'SignedByMePage'
    },
    {
      buttonTitle: 'Recusei - aguardando os demais',
      targetPage: 'RefusedByMePage'
    },
    {
      buttonTitle: 'Captura iniciada por mim',
      targetPage: 'CapturedByMePage'
    },
    {
      buttonTitle: "Consultar Processo",
      targetPage: "SepSearchPage"
    }
  ];

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
              .setRoot('MyServicesPage')
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
