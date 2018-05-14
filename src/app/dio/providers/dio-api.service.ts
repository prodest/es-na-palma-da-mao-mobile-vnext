import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
import { ANONYMOUS_HEADER } from './../../../libs/core/auth';

import { Edition, SearchFilter, SearchResult } from '../model';

@Injectable()
export class DioApiService {
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   *
   * @returns {Observable<Edition[]>}
   */
  public getLatestEditions(): Observable<Edition[]> {
    return this.http
      .get<Edition[]>(`${this.env.api.dio}/latest`, {
        headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' })
      })
      .pipe(share());
  }

  /**
   *
   *
   * @param {SearchFilter} [filter={ pageNumber: 0, sort: 'date' }]
   * @returns {Observable<SearchResult>}
   */
  public search(filter: SearchFilter): Observable<SearchResult> {
    let params = Object.assign({ pageNumber: this.env.pagination.pageNumber, sort: 'date' }, filter);
    return this.http
      .get<SearchResult>(`${this.env.api.dio}/search`, {
        params: new HttpParams()
          .set('pageNumber', params.pageNumber.toString())
          .set('sort', params.sort)
          .set('query', params.query)
          .set('dateMin', params.dateMin)
          .set('dateMax', params.dateMax),
        headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' })
      })
      .pipe(share());
  }
}
