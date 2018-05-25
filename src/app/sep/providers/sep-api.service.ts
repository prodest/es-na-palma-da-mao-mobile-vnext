import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
import { ANONYMOUS_HEADER } from '@espm/core/auth';

import { Protocol } from './../model';
import { SepStorageModel } from './sep-storage.model';

@Injectable()
export class SepApiService {
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   *
   * @param {number} protocolNumber
   * @returns {Promise<Protocol>}
   *
   * @memberOf SepApiService
   */
  getProcessByNumber(protocolNumber: string): Observable<Protocol> {
    return this.http
      .get<Protocol>(`${this.env.api.sep}/${protocolNumber}`, { headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' }) })
      .pipe(share());
  }

  syncFavoriteProtocols(favoriteProtocols: SepStorageModel): Observable<SepStorageModel> {
    return this.http.post<SepStorageModel>(`${this.env.api.espm}/sep/data/favorite`, favoriteProtocols).pipe(share());
  }
}
