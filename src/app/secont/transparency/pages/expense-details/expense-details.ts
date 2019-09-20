import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { DateRangeFilter, MoneyFlow, MoneyFlowPage } from '../../model';
import { TransparencyApiService } from './../../providers';

@IonicPage({
  segment: 'secont/despesa/:title',
  name: 'TransparenciaExpenseDetailsPage'
})
@Component({
  selector: 'page-transparencia-expense-details',
  templateUrl: 'expense-details.html'
})
export class ExpenseDetailsPage extends MoneyFlowPage<DateRangeFilter> implements OnInit {
  /**
   *
   */
  constructor(private api: TransparencyApiService, private params: NavParams, loadingCtrl: LoadingController) {
    super(loadingCtrl);
    this.title = this.params.get('title');
  }
  
  /**
   *
   */
  ngOnInit() {
    const filter = this.params.get('filter') || DateRangeFilter.currentYear();
    const id = this.params.get('id');

    this.doFilter({ id, filter }).subscribe();
  }

  /**
   *
   */
  protected getData({ id, filter }): Observable<MoneyFlow> {
    return this.api.getExpenseDetail(id, filter);
  }
}
