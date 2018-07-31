import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { ANONYMOUS_HEADER } from '@espm/core/auth';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

import { Protocol } from './../model';
import { FavoriteProtocolsData } from '../model';

@Injectable()
export class SepApiService {
  /**
   *
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   *
   */
  getProcessByNumber(protocolNumber: string): Observable<Protocol> {
    return this.http
      .get<Protocol>(`${this.env.api.sep}/${protocolNumber}`, { headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' }) })
      .pipe(share());
  }

  /**
   *
   *
   */
  syncFavoriteProtocols(favoriteProtocols: FavoriteProtocolsData): Observable<FavoriteProtocolsData> {
    let requestData = {
      date: favoriteProtocols.date,
      id: favoriteProtocols.id,
      favoriteProcess: favoriteProtocols.favoriteProcess.map(p => p.number)
    };
    return this.http.post<FavoriteProtocolsData>(`${this.env.api.espm}/sep/data/favorite`, requestData).pipe(share());
  }

  /**
   *
   *
   */
  getFavoriteProtocols(): Observable<FavoriteProtocolsData> {
    return this.http.get<FavoriteProtocolsData>(`${this.env.api.espm}/sep/data/favorite`).pipe(share());
  }
}
