import { Component } from '@angular/core';
import { IonicPage, AlertController, App, MenuController } from 'ionic-angular';
import { AuthQuery } from '@espm/core';


@IonicPage()
@Component({
  selector: 'page-presentation-civil-servant',
  templateUrl: 'presentation-civil-servant.html',
})
export class PresentationCivilServantPage {
  menus = [
    {
      buttonTitle: 'Contracheque',
      targetPage: 'PaystubPage'
    },
    {
      buttonTitle: 'Informe Rendimento',
      targetPage: 'ReportYieldsPage'
    },
  ];

  constructor( 
    private authQuery: AuthQuery, 
    private alertCtrl: AlertController, 
    protected appCtrl: App, 
    private menuCtrl: MenuController) {
  }


  /**
   * 
   */
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
              .push('LoginPage', { redirectTo: 'PresentationCivilServantPage' })
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
