import { Prevision } from './../model/prevision';
import { BusStop } from './../model/bus-stop';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share, flatMap, map } from 'rxjs/operators';

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
  getBusStopsByArea = (bounds: number[]): Promise<BusStop[]> => {
    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/json/db/pesquisarPontosDeParada`, { envelope: bounds })
      .pipe(map(resp => resp.pontosDeParada), flatMap(ids => this.listBusStopsByIds(ids)), share())
      .toPromise();
  };

  /**
   *
   */
  getBusStopsIdsByRoute = (originId: number, destinationId: number): Promise<number[]> => {
    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/json/db/pesquisarPontosDeParada`, {
        pontoDeOrigemId: originId,
        pontoDeDestinoId: destinationId
      })
      .pipe(map(resp => resp.pontosDeParada), share())
      .toPromise();
  };

  /**
   *
   */
  getBusStopsIdsByOrigin(id: number): Promise<any[]> {
    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/json/db/pesquisarPontosDeParada`, { pontoDeOrigemId: id })
      .pipe(map(resp => resp.pontosDeParada), share())
      .toPromise();
  }

  /**
   *
   */
  getPrevisionsByOriginAndDestination = (originId: number, destinationId: number): Promise<Prevision[]> => {
    const payload = {
      pontoDeOrigemId: originId,
      pontoDeDestinoId: destinationId
    };

    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/estimativas/obterEstimativasPorOrigemEDestino`, payload)
      .pipe(share())
      .toPromise();
  };

  /**
   *
   */
  getPrevisionsByOrigin = (id: number): Promise<Prevision[]> => {
    const payload = { pontoDeOrigemId: id };

    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/estimativas/obterEstimativasPorOrigem`, payload)
      .pipe(share())
      .toPromise();
  };

  /**
   *
   */
  searchBusStopsIds(text: string, originId: number | undefined): Promise<number[]> {
    const payload: any = { texto: text };
    if (originId) {
      payload.pontoDeOrigemId = originId;
    }

    return this.http
      .post<any>(`${this.env.api.ceturb}/transcolOnline/svc/texto/pesquisarPontosDeParada`, payload)
      .pipe(map(resp => resp.pontosDeParada), share())
      .toPromise();
  }

  /**
   *
   */
  private listBusStopsByIds = (ids: number[]): Observable<BusStop[]> => {
    return this.http.post<BusStop[]>(`${this.env.api.ceturb}/transcolOnline/svc/json/db/listarPontosDeParada`, {
      listaIds: ids
    });
  };
}
