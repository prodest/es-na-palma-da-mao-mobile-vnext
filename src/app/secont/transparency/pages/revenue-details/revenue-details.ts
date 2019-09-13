import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { DateRangeFilter, MoneyFlow, MoneyFlowPage } from '../../model';
import { TransparencyApiService } from './../../providers';

@IonicPage({
  segment: 'secont/receita/:title',
  name: 'TransparenciaRevenueDetailsPage'
})
@Component({
  selector: 'page-transparencia-revenue-details',
  templateUrl: 'revenue-details.html'
})
export class RevenueDetailsPage extends MoneyFlowPage<DateRangeFilter> implements OnInit {
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
limite = (valor) => {
  if (valor.length > 12){
    return valor.substring(0, 18)+"…";
    }else{
    return valor;
    }
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
    return this.api.getRevenueDetail(id, filter);
  }
}
