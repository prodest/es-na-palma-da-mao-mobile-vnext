import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ANONYMOUS_HEADER, Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

import {
  BudgetDeviation,
  DateRangeFilter,
  MoneyFlow,
  PublicWorks,
  PublicWorksByCity,
  PublicWorksDetail,
  YearFilter
} from '../model';

export type Params = { [key: string]: any };

@Injectable()
export class TransparencyApiService {
  /**
   *.
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   *
   */
  getBudgets(filter: YearFilter): Observable<MoneyFlow> {
    return this.getMoneyFlow(`${this.env.api.transparency}/budgets/expected`, filter);
  }

  /**
   *
   */
  getRevenues(filter: DateRangeFilter): Observable<MoneyFlow> {
    return this.getMoneyFlow(`${this.env.api.transparency}/revenues/area`, filter);
  }

  /**
   *
   *
   */
  getRevenueDetail(id: string, filter: DateRangeFilter): Observable<MoneyFlow> {
    return this.getMoneyFlow(`${this.env.api.transparency}/revenues/detail/${id}`, filter);
  }

  /**
   *
   *
   */
  getExpensesByArea(filter: DateRangeFilter): Observable<MoneyFlow> {
    return this.getMoneyFlow(`${this.env.api.transparency}/expenses/area`, filter);
  }

  /**
   *
   *
   */
  getExpensesByOrigin(filter: DateRangeFilter): Observable<MoneyFlow> {
    return this.getMoneyFlow(`${this.env.api.transparency}/expenses/origin`, filter);
  }

  /**
   *
   *
   */
  getExpenseDetail(id: string, filter: DateRangeFilter): Observable<MoneyFlow> {
    return this.getMoneyFlow(`${this.env.api.transparency}/expenses/detail/${id}`, filter);
  }

  /**
   *
   *
   */
  getBudgetDeviation(filter: YearFilter): Observable<BudgetDeviation> {
    return this.http
      .get<BudgetDeviation>(`${this.env.api.transparency}/budgets/deviation`, {
        params: this.toParams(filter),
        headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' })
      })
      .pipe(share());
  }

  /**
   *
   *
   */
  getPublicWorksByCities(filter: YearFilter): Observable<PublicWorks> {
    return this.http
      .get<PublicWorks>(`${this.env.api.transparency}/public-works/by-city`, {
        params: this.toParams(filter),
        headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' })
      })
      .pipe(share());
  }

  /**
   *
   *
   */
  getPublicWorksByCity(cityId: number, filter: YearFilter): Observable<PublicWorksByCity> {
    return this.http
      .get<PublicWorksByCity>(`${this.env.api.transparency}/public-works/list`, {
        params: this.toParams({ ...filter, ...{ cityId } }),
        headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' })
      })
      .pipe(share());
  }

  /**
   *
   *
   */
  getPublicWorksDetail(id: number): Observable<PublicWorksDetail> {
    return this.http
      .get<PublicWorksDetail>(`${this.env.api.transparency}/public-works/detail/${id}`, {
        headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' })
      })
      .pipe(share());
  }

  /**
   *
   *
   */
  private getMoneyFlow(endpoint: string, filter: DateRangeFilter | YearFilter): Observable<MoneyFlow> {
    return this.http
      .get<MoneyFlow>(endpoint, {
        params: this.toParams(filter),
        headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' })
      })
      .pipe(share());
  }

  /**
   *
   *
   */
  private toParams(params: Params = {}) {
    let httpParams = new HttpParams();
    Object.keys(params)
      .filter(key => params[key] != null)
      .forEach(key => (httpParams = httpParams.append(key, params[key].toString())));
    return httpParams;
  }
}
