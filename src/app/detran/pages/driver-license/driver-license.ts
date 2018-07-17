import { Component } from '@angular/core';
import { AuthQuery } from '@espm/core';
import { IonicPage, Loading, ModalController, NavController } from 'ionic-angular';

import { DriverLicense } from './../../model';
import { DriverService } from './../../providers';

@IonicPage({
  segment: 'detran/cadastrar-cnh'
})
@Component({
  selector: 'page-driver-license',
  templateUrl: 'driver-license.html'
})
export class DriverLicensePage {
  loading: Loading;

  /**
   *
   *
   */
  constructor(
    private authQuery: AuthQuery,
    private detran: DriverService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  /**
   * ref: https://github.com/ionic-team/ionic/issues/11459#issuecomment-365224107
   *
   */
  ionViewCanEnter(): boolean | Promise<any> {
    const user = this.authQuery.state.user;

    // permite acesso à tela de o usuário não possui cnh no acesso cidadão nem cadastrou agora
    const isAllowed = !(user.cnhNumero && user.cnhCedula);

    if (!isAllowed) {
      setTimeout(() => this.navCtrl.setRoot('DriverLicenseStatusPage'));
    }
    return isAllowed;
  }

  /**
   *
   *
   */
  addCNH = () => {
    let modal = this.modalCtrl.create('AddDriverLicensePage', null, {
      cssClass: 'pop-up-modal',
      enableBackdropDismiss: true
    });
    modal.onDidDismiss(this.saveCNH);
    modal.present();
  };

  /**
   *
   *
   */
  private saveCNH = (cnh: DriverLicense) => {
    cnh && this.detran.saveCNH(cnh).subscribe(() => this.navCtrl.setRoot('DriverLicenseStatusPage'));
  };
}
