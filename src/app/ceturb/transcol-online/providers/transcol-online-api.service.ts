import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { flatMap, map, share } from 'rxjs/operators';

import { BusStop, FavoriteStopsData, Prevision } from './../model';

/**
 *
 *
 */
@Injectable()
export class TranscolOnlineApiService {
  /**
   *
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   */
  getBusStopsByArea = (bounds: number[]): Observable<BusStop[]> => {
    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/json/db/pesquisarPontosDeParada`, { envelope: bounds })
      .pipe(map(resp => resp.pontosDeParada), flatMap(ids => this.listBusStopsByIds(ids)), share());
  };

  /**
   *
   */
  getBusStopsIdsByRoute = (originId: number, destinationId: number): Observable<number[]> => {
    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/json/db/pesquisarPontosDeParada`, {
        pontoDeOrigemId: originId,
        pontoDeDestinoId: destinationId
      })
      .pipe(map(resp => resp.pontosDeParada), share());
  };

  /**
   *
   */
  getBusStopsIdsByOrigin = (id: number): Observable<any[]> => {
    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/json/db/pesquisarPontosDeParada`, { pontoDeOrigemId: id })
      .pipe(map(resp => resp.pontosDeParada), share());
  };

  /**
   *
   */
  getPrevisionsByOriginAndDestination = (originId: number, destinationId: number): Observable<Prevision[]> => {
    const payload = {
      pontoDeOrigemId: originId,
      pontoDeDestinoId: destinationId
    };

    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/estimativas/obterEstimativasPorOrigemEDestino`, payload)
      .pipe(share());
  };

  /**
   *
   */
  getPrevisionsByOrigin = (id: number): Observable<Prevision[]> => {
    const payload = { pontoDeOrigemId: id };

    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/estimativas/obterEstimativasPorOrigem`, payload)
      .pipe(share());
  };

  /**
   *
   */
  getPrevisionsByOriginAndLine = (originId: number, lineId: number): Observable<Prevision[]> => {
    const payload = {
      pontoDeOrigemId: originId,
      linhaId: lineId
    };

    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/estimativas/obterEstimativasPorOrigemELinha`, payload)
      .pipe(share());
  };

  /**
   *
   */
  searchBusStopsIds = (text: string, originId: number | undefined): Observable<number[]> => {
    const payload: any = { texto: text };
    if (originId) {
      payload.pontoDeOrigemId = originId;
    }

    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/texto/pesquisarPontosDeParada`, payload)
      .pipe(map(resp => resp.pontosDeParada), share());
  };

  /**
   *
   */
  private listBusStopsByIds = (ids: number[]): Observable<BusStop[]> => {
    return this.http.post<BusStop[]>(`${this.env.api.ceturb}/transcolOnline/svc/json/db/listarPontosDeParada`, {
      listaIds: ids
    });
  };

  /**
   *
   */
  syncFavoriteStops = (favoriteStops: FavoriteStopsData): Observable<FavoriteStopsData> => {
    return this.http
      .post<FavoriteStopsData>(`${this.env.api.espm}/ceturb/transcolOnline/data/favoriteStops`, favoriteStops)
      .pipe(share());
  };
}
