import { Component } from '@angular/core';
import { AuthService } from '@espm/core/auth';
import { AlertController, App, IonicPage, NavParams } from 'ionic-angular';

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
    private auth: AuthService,
    private sepService: SepService
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
    if (this.auth.user.anonymous) {
      this.showAuthNeededModal();
    } else {
      if (this.isFavorite(protocol)) {
        this.sepService.removeFavorite(protocol).subscribe();
      } else {
        this.sepService.addFavorite(protocol).subscribe();
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
}
