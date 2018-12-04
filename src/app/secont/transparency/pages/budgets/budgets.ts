import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { MoneyFlow, MoneyFlowPage, YearFilter } from '../../model';
import { TransparencyApiService } from './../../providers';

@IonicPage({
  segment: 'secont/orcamentos',
  name: 'TransparenciaOrcamentosPage'
})
@Component({
  selector: 'page-transparencia-budgets',
  templateUrl: 'budgets.html'
})
export class BudgetsPage extends MoneyFlowPage<YearFilter> implements OnInit {
  /**
   *
   */
  constructor(private api: TransparencyApiService, private modalCtrl: ModalController, loadingCtrl: LoadingController) {
    super(loadingCtrl);
  }

  /**
   *
   */
  ngOnInit() {
    this.doFilter({ filter: YearFilter.currentYear() }).subscribe();
  }

  /**
   *
   */
  openFilter() {
    let filterModal = this.modalCtrl.create('TransparencyFilterPage', {
      title: 'Orçamento',
      year: true,
      filter: this.filter
    });
    filterModal.onDidDismiss((filter: YearFilter) => {
      if (filter) {
        this.doFilter({ filter: filter }).subscribe();
      }
    });
    filterModal.present();
  }

  /**
   *
   */
  protected getData({ filter }): Observable<MoneyFlow> {
    return this.api.getBudgets(filter);
  }
}
