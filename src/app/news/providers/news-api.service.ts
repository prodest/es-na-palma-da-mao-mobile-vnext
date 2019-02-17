import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables, Pagination } from '@espm/core';
import { ANONYMOUS_HEADER } from '@espm/core/auth';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

import { Filter, News, NewsDetails } from '../model';

@Injectable()
export class NewsApiService {
  /**
   *
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   *
   */
  getNewsById(id: string): Observable<NewsDetails> {
    return this.http
      .get<NewsDetails>(`${this.env.api.news}/${id}`, { headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' }) })
      .pipe(share());
  }

  /**
   *
   *
   */
  getHighlightNews(): Observable<News[]> {
    return this.http
      .get<News[]>(`${this.env.api.news}/highlights`, { headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' }) })
      .pipe(share());
  }

  /**
   *
   *
   */
  getNews(filter: Filter, pagination: Pagination): Observable<News[]> {
    let defaults = {
      origins: [],
      query: '',
      pageNumber: this.env.pagination.pageNumber,
      pageSize: this.env.pagination.pageSize
    };

    let params = Object.assign({}, defaults, filter, pagination);

    return this.http.get<News[]>(this.env.api.news, {
      params: new HttpParams()
        .set('pageNumber', params.pageNumber.toString())
        .set('pageSize', params.pageSize.toString())
        .set('origins', JSON.stringify(params.origins))
        .set('query', params.query)
        .set('dateMin', params.dateMin)
        .set('dateMax', params.dateMax),
      headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' })
    });
  }

  /**
   *
   *
   */
  getAvailableOrigins(): Promise<string[]> {
    return this.http
      .get<string[]>(`${this.env.api.news}/origins`, { headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' }) })
      .pipe(share())
      .toPromise();
  }
}
