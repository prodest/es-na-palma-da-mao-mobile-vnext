import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { DateRangeFilter, MoneyFlow, MoneyFlowListPage } from '../../model';
import { TransparencyApiService } from './../../providers';

@IonicPage({
  segment: 'secont/despesas-por-area',
  name: 'TransparenciaExpensesByAreaPage'
})
@Component({
  selector: 'page-transparencia-expenses-by-area',
  templateUrl: 'expenses-by-area.html'
})
export class ExpensesByAreaPage extends MoneyFlowListPage<DateRangeFilter> implements OnInit {
  /**
   *
   */
  constructor(
    private api: TransparencyApiService,
    private modalCtrl: ModalController,
    navCtrl: NavController,
    loadingCtrl: LoadingController
  ) {
    super(navCtrl, loadingCtrl);
  }

  /**
   *
   */
  ngOnInit() {
    this.filter = DateRangeFilter.currentYear();
    this.doFilter({ filter: this.filter }).subscribe();
  }

  openFilter() {
    let filterModal = this.modalCtrl.create('TransparencyFilterPage', {
      title: 'Filtrar',
      year: false,
      filter: this.filter
    });
    filterModal.onDidDismiss((filter: DateRangeFilter) => {
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
    return this.api.getExpensesByArea(filter);
  }
}
