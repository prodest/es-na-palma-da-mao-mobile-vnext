import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Protocol, ProtocolUpdate } from '../../model';
import { SepStorageProvider, SepService } from '../../providers';
import { AuthService } from '@espm/core/auth';

/**
 * Generated class for the SepDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sep-details',
  templateUrl: 'sep-details.html',
  providers: [SepStorageProvider]
})
export class SepDetailsPage {
  protocol: Protocol;
  lastUpdate: ProtocolUpdate;
  showAllUpdates: boolean = true;

  constructor(
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private auth: AuthService,
    private sepService: SepService
  ) {
    this.lastUpdate = null;
    this.protocol = null;
  }

  ionViewDidLoad() {
    if (this.navParams.data.protocol) {
      this.protocol = this.navParams.data.protocol;
      this.lastUpdate = this.protocol.updates[0];
      console.log(this.auth.user);
    }
  }

  isFavorite(protocol: Protocol): boolean {
    return this.sepService.isFavorite(protocol);
  }

  /**
   * Alterna a visibilidade das atualizações do processo eletrônico
   */
  toggleUpdates(): void {
    this.showAllUpdates = !this.showAllUpdates;
  }

  toggleFavorite(protocol: Protocol): void {
    if (this.auth.user.anonymous) {
      this.showMessage('Você precisa estar logado para ter acesso a essa funcionalidade');
    } else {
      if (this.isFavorite(protocol)) {
        this.sepService.removeFavorite(protocol).subscribe();
      } else {
        this.sepService.addFavorite(protocol).subscribe();
      }
    }
  }

  private showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };
}
