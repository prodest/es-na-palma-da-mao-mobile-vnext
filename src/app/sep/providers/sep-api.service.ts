import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
import { ANONYMOUS_HEADER } from '@espm/core/auth';

import { FavoriteProcessData, Process } from './../model';

@Injectable()
export class SepApiService {
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   *
   * @param {number} procNumber
   * @returns {Promise<Process>}
   *
   * @memberOf SepApiService
   */
  getProcessByNumber(procNumber: string): Observable<Process> {
    return this.http
      .get<Process>(`${this.env.api.sep}/${procNumber}`, { headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' }) })
      .pipe(share());
  }

  syncFavoriteProcess(favoriteProcess: FavoriteProcessData): Observable<FavoriteProcessData> {
    return this.http.post<FavoriteProcessData>(`${this.env.api.espm}/sep/data/favorite`, favoriteProcess).pipe(share());
  }
}
