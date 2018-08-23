import { Component } from '@angular/core';
import { AuthNeededService, AuthQuery } from '@espm/core';
import { IonicPage, NavParams } from 'ionic-angular';

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
    private navParams: NavParams,
    private authQuery: AuthQuery,
    private authNeeded: AuthNeededService,
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
    return protocol ? this.sepService.isFavorite(protocol.number) : false;
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
      this.authNeeded.showAuthNeededModal();
    } else {
      this.isFavorite(protocol) ? this.sepService.removeFavorite(protocol) : this.sepService.addFavorite(protocol);
    }
  }
}
