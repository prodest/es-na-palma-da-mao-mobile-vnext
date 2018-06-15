import { LoadingController, NavController } from 'ionic-angular';

import { ChartModel, DateRangeFilter, MoneyFlow, MoneyFlowItem, TransparencyPage, YearFilter } from '../model';

export abstract class MoneyFlowPage<TFilter extends DateRangeFilter | YearFilter> extends TransparencyPage<
  TFilter,
  MoneyFlow
> {
  /**
   *
   */
  constructor(loadingCtrl: LoadingController) {
    super(loadingCtrl);
  }

  /**
   *
   */
  protected createChartModel(items: MoneyFlowItem[]): ChartModel {
    return {
      labels: items.map(item => item.label),
      values: items.map(item => item.percentage),
      colors: [{ backgroundColor: items.map(item => item.color) }]
    };
  }
}

export abstract class MoneyFlowListPage<TFilter extends DateRangeFilter | YearFilter> extends MoneyFlowPage<TFilter> {
  /**
   *
   */
  constructor(private navCtrl: NavController, loadingCtrl: LoadingController) {
    super(loadingCtrl);
  }

  /**
   *
   *
   */
  openDetails(page: string, item: MoneyFlowItem): void {
    this.navCtrl.push(page, { id: item.originId, label: item.label, filter: this.filter });
  }
}
