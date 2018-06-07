import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { share } from 'rxjs/operators';

import { BusLine, BusLineDetails, BusRoute, FavoriteLinesData } from './../model/';
import { BusSchedule } from './../model/bus-schedule';

/**
 *
 *
 */
@Injectable()
export class CeturbApiService {
  /**
   *
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   */
  getLines = (): Observable<BusLine[]> => {
    return this.http
      .get<BusLine[]>(`${this.env.api.ceturb}/lines`, {
        headers: new HttpHeaders({ anonymous: 'true' })
      })
      .pipe(share());
  };

  /**
   *
   *
   */
  getLineDetails = (lineNumber: string): Observable<BusLineDetails> => {
    // informações de horários
    const schedule$ = this.http
      .get<BusSchedule>(`${this.env.api.ceturb}/schedule/${lineNumber}`, {
        headers: new HttpHeaders({ anonymous: 'true' })
      })
      .pipe(share());

    // informações de rota
    const route$ = this.http
      .get<BusRoute>(`${this.env.api.ceturb}/route/${lineNumber}`, {
        headers: new HttpHeaders({ anonymous: 'true' })
      })
      .pipe(share());

    return forkJoin(schedule$, route$, (schedule: BusSchedule, route: BusRoute) => ({ schedule, route }));
  };

  /**
   *
   *
   */
  getRoute = (id: string = ''): Observable<BusRoute> => {
    return this.http
      .get<BusRoute>(`${this.env.api.ceturb}/route/${id}`, {
        headers: new HttpHeaders({ anonymous: 'true' })
      })
      .pipe(share());
  };

  /**
   *
   */
  syncFavoriteLines = (favoriteLines: FavoriteLinesData): Observable<FavoriteLinesData> => {
    return this.http.post<FavoriteLinesData>(`${this.env.api.espm}/ceturb/data/favorite`, favoriteLines).pipe(share());
  };
}
