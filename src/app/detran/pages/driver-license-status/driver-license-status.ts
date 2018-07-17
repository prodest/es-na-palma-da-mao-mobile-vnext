import { Component } from '@angular/core';
import { AuthQuery } from '@espm/core';
import { IonicPage, NavController } from 'ionic-angular';
import * as moment from 'moment';

import { DriverStatus, DriverStatusName, Ticket } from '../../model';
import { DriverService } from './../../providers';

@IonicPage({
  segment: 'detran/cnh'
})
@Component({
  selector: 'page-driver-license-status',
  templateUrl: 'driver-license-status.html'
})
export class DriverLicenseStatusPage {
  tickets: Ticket[];
  status: {
    expirationDate: string;
    renew: boolean;
    ok: boolean;
    blocked: boolean;
    expired: boolean;
    blockMotive: string;
  };

  /**
   *
   */
  constructor(private authQuery: AuthQuery, private detran: DriverService, private navCtrl: NavController) {}

  /**
   * ref: https://github.com/ionic-team/ionic/issues/11459#issuecomment-365224107
   *
   */
  ionViewCanEnter(): boolean | Promise<any> {
    const { cnhNumero, cnhCedula } = this.authQuery.state.claims;

    // permite acesso à tela de o usuário possui cnh no acesso cidadão ou cadastrou agora
    const isAllowed = !!(cnhNumero && cnhCedula);

    if (!isAllowed) {
      setTimeout(() => this.navCtrl.setRoot('DriverLicensePage'));
    }
    return isAllowed;
  }

  /**
   *
   */
  ionViewWillLoad() {
    this.loadData();
  }

  /**
   *
   */
  private loadData = () => {
    this.detran.getDriverStatus().subscribe(this.updateStatus, () => (this.status = null));

    this.detran.getDriverTickets().subscribe(tickets => (this.tickets = tickets), () => (this.tickets = null));
  };

  /**
   *
   */
  private updateStatus = (status: DriverStatus) => {
    // const mockCNH = (expirationDate, status, blockMotive) => {
    //     return {
    //         expirationDate,
    //         blocked: status === DriverStatus.Blocked,
    //         ok: status === DriverStatus.Ok,
    //         expired: !!expirationDate && moment(expirationDate).add(30, 'days').isBefore(moment().startOf('day')),
    //         renew: !!expirationDate && moment().startOf('day').isAfter(expirationDate) && moment(expirationDate).add(30, 'days').isAfter(moment().startOf('day')),
    //         blockMotive: blockMotive,
    //         blockDate: expirationDate ? moment(expirationDate).add(30, 'days') : null
    //     }
    // }

    // this.cnh = mockCNH('2018-02-15T00:00:00.000Z', DriverStatus.Ok, null) // expirando
    // this.cnh = mockCNH( '2018-01-15T00:00:00.000Z', DriverStatus.Ok, null ) // expirado
    // this.cnh = mockCNH( '2017-01-15T00:00:00.000Z', DriverStatus.Blocked, 'Atrasado demais' ) // bloqueado vencida
    // this.cnh = mockCNH( '2019-01-15T00:00:00.000Z', DriverStatus.Blocked, 'Atrasado demais' ) // bloqueado não vencida
    // this.cnh = mockCNH( '2019-01-15T00:00:00.000Z', DriverStatus.Ok, null ) // ok

    this.status = {
      expirationDate: status.expirationDate,
      blocked: status.status === DriverStatusName.Blocked,
      ok: status.status === DriverStatusName.Ok,
      expired:
        !!status.expirationDate &&
        moment(status.expirationDate)
          .add(30, 'days')
          .isBefore(moment().startOf('day')),
      renew:
        !!status.expirationDate &&
        moment()
          .startOf('day')
          .isAfter(status.expirationDate) &&
        moment(status.expirationDate)
          .add(30, 'days')
          .isAfter(moment().startOf('day')),
      blockMotive: status.blockMotive
    };
  };
}
