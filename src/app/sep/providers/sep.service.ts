import { Injectable, OnDestroy } from '@angular/core';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, finalize, flatMap, takeUntil, filter, map, tap } from 'rxjs/operators';

import { FavoriteProtocol, Protocol, FavoriteProtocolsData } from './../model';
import { SepApiService } from './sep-api.service';
import { FavoriteProtocolStore } from './sep.store';
import { SepQuery } from './sep.query';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '@espm/core';

/**
 *
 *
 * @export
 * @class SepService
 * @implements {OnDestroy}
 */
@Injectable()
export class SepService implements OnDestroy {
  loading: Loading;
  destroyed$ = new Subject();
  favorites: FavoriteProtocol[] = [];

  /**
   *
   *
   */
  constructor(
    private api: SepApiService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private favoriteProtocolStore: FavoriteProtocolStore,
    private sepQuery: SepQuery,
    private auth: AuthService
  ) {
    this.auth.signed$.pipe(takeUntil(this.destroyed$)).subscribe(signed => {
      if (!signed) {
        this.favoriteProtocolStore.remove();
      }
    });

    this.sepQuery.favorites$
      .pipe(
        takeUntil(this.destroyed$),
        tap(favoriteProtocols => (this.favorites = favoriteProtocols)),
        filter(() => !this.favoriteProtocolStore.isPristine),
        flatMap(this.syncFavorites)
      )
      .subscribe();
  }

  /**
   *
   *
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  /**
   *
   *
   */
  getProtocolByNumber(protocolNumber: string): Observable<FavoriteProtocol> {
    this.showLoading();

    return this.api.getProcessByNumber(protocolNumber).pipe(finalize(this.dismissLoading));
  }

  /*
   *
   */
  hasFavorites = () => this.favorites.length > 0;

  /*
   *
   */
  isFavorite = (protocolNumber: string) => this.sepQuery.isFavorite(protocolNumber);

  /*
   *
   */
  loadFavorites = () => this.api.getFavoriteProtocols().pipe(map(p => p.favoriteProcess), tap(this.storeFavoriteProtocols));

  /**
   *
   *
   */
  addFavorite = (protocol: Protocol): void => {
    this.favoriteProtocolStore.createOrReplace(protocol.number, this.mapFavorite(protocol));
    this.showMessage(`Acompanahando protocolo ${protocol.number}`);
  };

  /**
   *
   *
   */
  removeFavorite = (protocol: Protocol): void => {
    this.favoriteProtocolStore.remove(protocol.number);
    this.showMessage(`Acompanhamento ${protocol.number} removido`);
  };

  /**
   *
   *
   */
  syncFavorites = (favoriteProtocols?: FavoriteProtocol[]): Observable<FavoriteProtocolsData> => {
    this.showLoading();

    return this.api
      .syncFavoriteProtocols({
        favoriteProcess: favoriteProtocols,
        date: new Date().toISOString()
      })
      .pipe(
        finalize(this.dismissLoading),
        catchError(error => {
          this.showMessage('Erro ao adicionar acompanhamento. Tente novamente.');
          return _throw(error);
        })
      );
  };

  private storeFavoriteProtocols = (data: FavoriteProtocol[]) => {
    return this.favoriteProtocolStore.set(this.normalizeFavorites(data));
  };

  /**
   *
   *
   */
  private mapFavorite(protocol: Protocol): FavoriteProtocol {
    return {
      number: protocol.number,
      subject: protocol.subject,
      summary: protocol.summary,
      status: protocol.status
    };
  }

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
      this.loading.dismiss();
      this.loading = null;
    }
  };

  /**
   *
   *
   */
  private showMessage = (message: string) => this.toastCtrl.create({ message, duration: 4000 }).present();

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
