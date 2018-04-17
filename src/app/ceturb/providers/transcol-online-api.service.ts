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
  private listBusStopsByIds = (ids: number[]): Observable<BusStop[]> => {
    return this.http.post<BusStop[]>(`${this.env.api.ceturb}/transcolOnline/svc/json/db/listarPontosDeParada`, {
      listaIds: ids
    });
  };
}
