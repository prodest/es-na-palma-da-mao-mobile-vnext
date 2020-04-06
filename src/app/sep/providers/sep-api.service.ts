import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { ANONYMOUS_HEADER } from '@espm/core/auth';
import { Observable } from 'rxjs/Observable';
import { map, share } from 'rxjs/operators';

import { FavoriteProtocolsData } from '../model';
import { Protocol } from './../model';

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
  getProtocol(protocol: string): Observable<Protocol> {
    return this.http
      .get<Protocol>(`${this.env.api.sep}/${protocol}`, { headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' }) })
      .pipe(share());
  }

  /**
   *
   *
   */
  syncFavoriteProtocols(favorites: FavoriteProtocolsData): Observable<FavoriteProtocolsData> {
    return this.http
      .post<FavoriteProtocolsData>(`${this.env.api.espm}/sep/data/favorite`, favorites)
      .pipe(map(this.normalizeFavorites), share());
  }

  /**
   *
   *
   */
  getFavoriteProtocols(): Observable<FavoriteProtocolsData> {
    return this.http
      .get<FavoriteProtocolsData>(`${this.env.api.espm}/sep/data/favorite`)
      .pipe(map(this.normalizeFavorites), share());
  }

  /*
   *
   * Para adaptar a versão antiga com a versão nova do objeto FavoriteProtocol
   */
  private normalizeFavorites = (data: FavoriteProtocolsData): FavoriteProtocolsData => {
    const protocols = (data.protocols || (data as any).favoriteProcess || (data as any).favoriteProtocols || [])
      .map((protocol) => {
        return typeof protocol === 'string'
          ? {
              number: protocol,
              subject: '',
              summary: '',
              status: '',
            }
          : protocol;
      })
      .filter((item, index, self) => self.findIndex((i) => i.number === item.number) === index);

    return {
      ...data,
      ...{ protocols },
    };
  };
}
