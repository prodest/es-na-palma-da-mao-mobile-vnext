import { Loading, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { finalize, map, tap } from 'rxjs/operators';

import { ChartModel, DateRangeFilter, YearFilter } from './';

export interface ReportItem {
  label: string;
  plot: boolean;
  list: boolean;
  percentage: number;
}
export interface Report {
  items: ReportItem[];
  listable: ReportItem[];
  plotable: ReportItem[];
  info: string;
  lastUpdate: any;
  chart: ChartModel;
}

export abstract class TransparencyPage<TFilter extends DateRangeFilter | YearFilter, TType extends Report> {
  reportTitle: string | undefined;
  data: TType | undefined;
  filter: TFilter;
  showFilter: boolean = false;
  showChart: boolean = true;
  title: string;
  protected loading: Loading;

  /**
   *
   */
  constructor(private loadingCtrl: LoadingController) {}

  /**
   *
   *
   */
  doFilter(params?: { id?: string; filter: TFilter }): Observable<TType> {
    // inicia a animação que fecha o filtro
    this.showFilter = false;
    this.showLoading('Aguarde');
    return this.getData(params).pipe(
      finalize(this.dismissLoading),
      map(this.decorateData),
      tap(this.updateData),
      tap(data => {
        this.reportTitle = params.filter.description();
        this.filter = params.filter;
      })
    );
  }

  /**
   *
   */
  private decorateData = (data: TType) => {
    const plotable = data.items.filter(i => (i.plot !== undefined ? i.plot : true));
    const listable = data.items.filter(i => (i.list !== undefined ? i.list : true));

    return Object.assign({}, data, {
      plotable,
      listable,
      chart: this.createChartModel(plotable as any)
    });
  };

  /**
   *
   */
  private updateData = (data: TType) => {
    this.data = data;
  };

  /**
   *
   *
   */
  private showLoading = (message: string = 'Aguarde') => {
    if (this.loading) {
      this.loading.setContent(message);
    } else {
      this.loading = this.loadingCtrl.create({ content: message, dismissOnPageChange: true });
      this.loading.present();
    }
  };

  /**
   *
   *
   */
  private dismissLoading = () => {
    if (this.loading) {
      this.loading.dismiss().catch(console.log);
      this.loading = null;
    }
  };

  /**
   *
   */
  protected abstract getData(params: { id?: string; filter: TFilter }): Observable<TType>;

  /**
   *
   */
  protected abstract createChartModel(items: TType['items']): ChartModel;
}
