import { Injectable } from '@angular/core';
import { AlertController, App, MenuController } from 'ionic-angular';

/**
 * Classe para autenticação usando IdentityServer3 no acessso cidadão
 * Centraliza acesso a token, claims e local-storage de autenticação
 */
@Injectable()
export class AuthNeededService {
  /**
   * Creates an instance of AuthNeededService.
   *
   */
  constructor(private alertCtrl: AlertController, private appCtrl: App, private menuCtrl: MenuController) {}

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
          role: 'cancel'
        },
        {
          text: 'Autenticar',
          handler: () => {
            this.appCtrl
              .getRootNav()
              .setRoot('LoginPage')
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
