import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { ANONYMOUS_HEADER } from '@espm/core/auth';
import { Observable } from 'rxjs/Observable';
import { share, map } from 'rxjs/operators';

import { Protocol, FavoriteProtocol } from './../model';
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
    return this.http.post<FavoriteProtocolsData>(`${this.env.api.espm}/sep/data/favorite`, requestData).pipe(
      map((data: FavoriteProtocolsData) => {
        return {
          id: data.id,
          date: data.date,
          favoriteProcess: this.normalizeFavorites(data.favoriteProcess)
        };
      }),
      share()
    );
  }

  /**
   *
   *
   */
  getFavoriteProtocols(): Observable<FavoriteProtocolsData> {
    return this.http.get<FavoriteProtocolsData>(`${this.env.api.espm}/sep/data/favorite`).pipe(
      map((data: FavoriteProtocolsData) => {
        return {
          id: data.id,
          date: data.date,
          favoriteProcess: this.normalizeFavorites(data.favoriteProcess)
        };
      }),
      share()
    );
  }
  /*
   *
   * Para adaptar a versão antiga com a versão nova do objeto FavoriteProtocol
   */
  private normalizeFavorites = (data: any): FavoriteProtocol[] => {
    return data
      .map(protocol => {
        if (typeof protocol === 'string') {
          return {
            number: protocol,
            subject: '',
            summary: '',
            status: ''
          };
        } else {
          return protocol;
        }
      })
      .filter((item, index, self) => self.findIndex(i => i.number === item.number) === index);
  };
}
