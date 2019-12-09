import { Component } from '@angular/core';
import { IonicPage, AlertController, App, MenuController } from 'ionic-angular';
import { AuthQuery } from '@espm/core';

@IonicPage()
@Component({
  selector: 'page-sedu-index',
  templateUrl: 'sedu-index.html',
})
export class SeduIndexPage {
  menus = [
    {
      buttonTitle: "Reclamar sobre transporte",
      targetPage: "SeduDenunciasPage"
    },
    {
      buttonTitle: "Minhas reclamações",
      targetPage: "MinhasDenunciasPage"
    }
  ];

  constructor(
    public auth: AuthQuery,
    public alertCtrl: AlertController,
    protected appCtrl: App,
    private menuCtrl: MenuController) {}

  ionViewCanEnter(): boolean | Promise<any> {
    // Check de autenticação
    let isAllowed = this.auth.isLoggedIn;
    if (!isAllowed) {
      this.showAuthNeededModal()
    }
    return isAllowed;
  }

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
              .push('LoginPage', { redirectTo: 'SeduIndexPage' })
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
