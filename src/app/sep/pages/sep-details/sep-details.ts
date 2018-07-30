import { Component } from '@angular/core';
import { AuthQuery } from '@espm/core';
import { AlertController, App, IonicPage, NavParams, ToastController } from 'ionic-angular';

import { Protocol, ProtocolUpdate } from '../../model';
import { SepService } from '../../providers';

@IonicPage({
  segment: 'sep/processo/:protocol'
})
@Component({
  selector: 'page-sep-details',
  templateUrl: 'sep-details.html'
})
export class SepDetailsPage {
  protocol: Protocol;
  lastUpdate: ProtocolUpdate;
  showAllUpdates: boolean = true;

  /**
   *
   *
   */
  constructor(
    public navParams: NavParams,
    private appCtrl: App,
    private alertCtrl: AlertController,
    private authQuery: AuthQuery,
    private sepService: SepService,
    private toastCtrl: ToastController
  ) {
    this.lastUpdate = null;
    this.protocol = null;
  }

  /**
   *
   *
   */
  ionViewDidLoad() {
    if (this.navParams.data.protocol) {
      this.protocol = this.navParams.data.protocol;
      this.lastUpdate = this.protocol.updates[0];
    }
  }

  /**
   *
   *
   */
  isFavorite(protocol: Protocol): boolean {
    return this.sepService.isFavorite(protocol);
  }

  /**
   * Alterna a visibilidade das atualizações do processo eletrônico
   */
  toggleUpdates(): void {
    this.showAllUpdates = !this.showAllUpdates;
  }

  /**
   *
   *
   */
  toggleFavorite(protocol: Protocol): void {
    if (!this.authQuery.isLoggedIn) {
      this.showAuthNeededModal();
    } else {
      if (this.isFavorite(protocol)) {
        this.sepService.removeFavorite(protocol).subscribe(() => {
          this.showMessage(`Protocolo ${protocol} removido dos favoritos`);
        });
      } else {
        this.sepService.addFavorite(protocol).subscribe();
        this.showMessage(`Protocolo ${protocol} adicionado aos favoritos`);
      }
    }
  }

  /**
   *
   *
   */
  private showAuthNeededModal = () => {
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
              .push('LoginPage')
              .then(() => alert.dismiss());
            return false;
          }
        }
      ]
    });
    return alert.present();
  };

  /**
   *
   *
   */
  private showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };
}
