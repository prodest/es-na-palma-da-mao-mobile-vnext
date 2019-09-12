import { share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { FavoriteMenusData } from '../models/favorite-menus-date';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class MenuApiService {
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  saveFavoriteMenus = (favoriteMenus: FavoriteMenusData): Observable<FavoriteMenusData> => {
    return this.http.post<FavoriteMenusData>(`${this.env.api.espm}/espm/modules/favorite`, favoriteMenus).pipe(share());
  };
  /**
   *
   */
  getFavoriteMenusData = (): Observable<FavoriteMenusData> => {
    return this.http.get<FavoriteMenusData>(`${this.env.api.espm}/espm/modules/favorite`).pipe(share());
  };
}
