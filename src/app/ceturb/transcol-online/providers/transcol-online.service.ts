import { Injectable } from '@angular/core';
import { AuthService } from '@espm/core/auth';
import { ActionSheetController, AlertController, App, Loading, LoadingController, Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { finalize, map, tap } from 'rxjs/operators';

import { BusLine, BusStop, FavoriteLocation, FavoriteStop, FavoriteStopsData, Prevision } from './../model';
import { TranscolOnlineApiService } from './transcol-online-api.service';

/**
 *
 *
 */
@Injectable()
export class TranscolOnlineService {
  loading: Loading;
  private allStops: { [id: number]: BusStop };
  private busStops$$ = new BehaviorSubject<BusStop[]>([]);

  /**
   *
   *
   */
  get busStops$(): Observable<BusStop[]> {
    return this.busStops$$.asObservable();
  }

  /**
   *
   *
   */
  get favorites$(): Observable<BusStop[]> {
    return this.busStops$.pipe(map(stops => stops.filter(s => s.isFavorite)));
  }

  /**
   *
   *
   */
  get busStops(): BusStop[] {
    return this.busStops$$.getValue();
  }

  /**
   *
   *
   */
  get favorites(): FavoriteStop[] {
    return this.busStops.filter(b => b.isFavorite).map(b => ({ id: b.id, location: b.favoriteLocation }));
  }

  /**
   *
   *
   */
  constructor(
    private api: TranscolOnlineApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private app: App,
    private auth: AuthService,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController
  ) {}

  /**
   *
   *
   */
  getBusStopsByArea = (bounds: number[]): Observable<BusStop[]> => {
    this.showLoading();

    let stops$ = this.auth.user.anonymous
      ? this.api.getBusStopsByArea(bounds)
      : forkJoin(this.api.getBusStopsByArea(bounds), this.syncFavorites()).pipe(map(this.mergeResults));

    return stops$.pipe(finalize(this.dismissLoading), tap(this.updateStops));
  };

  /**
   *
   */
  getRouteDestinations(originId: number, destinationId: number): Observable<BusStop[]> {
    return this.api.getBusStopsIdsByRoute(originId, destinationId).pipe(map(this.loadStopsFromMemory));
  }

  /**
   *
   */
  getOriginDestinations(originId: number): Observable<BusStop[]> {
    return this.api.getBusStopsIdsByOrigin(originId).pipe(map(this.loadStopsFromMemory));
  }

  /**
   *
   */
  getOriginPrevisions(originId: number): Observable<Prevision[]> {
    return this.api.getPrevisionsByOrigin(originId);
  }

  /**
   *
   */
  getLinePrevisions(line: BusLine): Observable<Prevision[]> {
    return this.api.getPrevisionsByOriginAndLine(line.pontoDeOrigemId, line.linhaId);
  }

  /**
   *
   */
  getRoutePrevisions(originId: number, destinationId: number): Observable<Prevision[]> {
    return this.api.getPrevisionsByOriginAndDestination(originId, destinationId);
  }

  /**
   *
   */
  searchBusStops(text: string, originId: number | undefined): Observable<BusStop[]> {
    return this.api.searchBusStopsIds(text, originId).pipe(map(this.loadStopsFromMemory));
  }

  /**
   *
   *
   */
  toggleFavorite = (stop: BusStop) => {
    if (this.auth.isAnonymous) {
      return fromPromise(this.showAuthNeededModal());
    }

    const isFavorite = this.favorites.find(f => f.id === stop.id);

    if (isFavorite) {
      this.removeFavorite(stop);
    } else {
      this.chooseFavoriteLocation(stop);
    }
  };

  /**
   *
   *
   */
  addFavorite = (stop: BusStop, location: FavoriteLocation) => {
    if (this.auth.isAnonymous) {
      return fromPromise(this.showAuthNeededModal());
    }

    // adiciona à lista de favoritos
    const newFavorites = [...this.favorites, { id: stop.id, location }];

    // sincroniza a lista de favoritos
    this.syncFavoritesBusStops(newFavorites);
  };

  /**
   *
   *
   */
  removeFavorite = (stop: BusStop) => {
    if (this.auth.isAnonymous) {
      return fromPromise(this.showAuthNeededModal());
    }

    // remove da lista de favoritos
    const newFavorites = this.favorites.filter(l => l.id !== stop.id);

    // sincroniza a lista de favoritos
    this.syncFavoritesBusStops(newFavorites);
  };

  /**
   *
   *
   */
  private chooseFavoriteLocation = (stop: BusStop) => {
    let actionSheet = this.actionSheetCtrl.create({
      title: `Ponto ${stop.identificador} - ${stop.descricao || stop.logradouro}`,
      buttons: [
        {
          text: 'Casa',
          icon: !this.platform.is('ios') ? 'home' : null,
          handler: () => {
            this.addFavorite(stop, 'casa');
          }
        },
        {
          text: 'Trabalho',
          icon: !this.platform.is('ios') ? 'briefcase' : null,
          handler: () => {
            this.addFavorite(stop, 'trabalho');
          }
        },
        {
          text: 'Escola',
          icon: !this.platform.is('ios') ? 'school' : null,
          handler: () => {
            this.addFavorite(stop, 'escola');
          }
        },
        {
          text: 'Outros',
          icon: !this.platform.is('ios') ? 'star' : null,
          handler: () => {
            this.addFavorite(stop, 'outros');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null
        }
      ]
    });
    actionSheet.present();
  };

  /**
   *
   *
   */
  private loadStopsFromMemory = (ids: number[]): BusStop[] => {
    return ids.map(id => this.allStops[id]).filter(m => !!m);
  };

  /**
   *
   *
   */
  private updateStops = (stops: BusStop[]) => {
    this.allStops = stops.reduce((map, stop) => {
      map[stop.id] = stop;
      return map;
    }, {});
    this.busStops$$.next([...stops]);
  };

  /**
   *
   *
   */
  private syncFavoritesBusStops = (favoriteStops?: FavoriteStop[]) => {
    this.showLoading();
    this.syncFavorites(favoriteStops)
      .pipe(
        finalize(this.dismissLoading),
        map(() => this.mergeResults([this.busStops, favoriteStops])),
        tap(this.updateStops)
      )
      .subscribe();
  };

  /**
   *
   *
   */
  private syncFavorites = (favoriteStops?: FavoriteStop[]): Observable<FavoriteStop[]> => {
    const syncData: FavoriteStopsData = { items: [], date: null };

    // novos dados sendo enviados para serem salvos
    if (favoriteStops) {
      syncData.items = favoriteStops;
      syncData.date = new Date().toISOString();
    }

    return this.api.syncFavoriteStops(syncData).pipe(map((result: FavoriteStopsData) => result.items));
  };

  /**
   *
   *
   */
  private showAuthNeededModal = () => {
    let alert = this.alertCtrl.create({
      title: 'Login necessário',
      message: 'Para favoritar um ponto é preciso estar autenticado no <strong>ES na palma da mão</strong>.',
      buttons: [
        {
          text: 'Entendi',
          role: 'cancel'
        },
        {
          text: 'Autenticar',
          handler: () => {
            this.app
              .getRootNav()
              .setRoot('LoginPage')
              .then(() => alert.dismiss());
            return false;
          }
        }
      ]
    });
    return alert.present();
  };

  /**
   *
   *
   */
  private mergeResults = ([stops, favorites]: [BusStop[], FavoriteStop[]]): BusStop[] => {
    return stops.map(stop => {
      const favorite = favorites.find(f => f.id === stop.id);
      return {
        ...stop,
        isFavorite: !!favorite,
        favoriteLocation: favorite ? favorite.location : undefined
      };
    });
  };

  /**
   *
   *
   */
  private showLoading = (message: string = 'Aguarde') => {
    if (this.loading) {
      this.loading.setContent(message);
    } else {
      this.loading = this.loadingCtrl.create({ content: message, dismissOnPageChange: true });
      this.loading.present();
    }
  };

  /**
   *
   *
   */
  private dismissLoading = () => {
    if (this.loading) {
      this.loading.dismiss().catch(console.log);
      this.loading = null;
    }
  };
}
