import { Injectable, OnDestroy } from '@angular/core';
import { AuthQuery } from '@espm/core';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, filter, finalize, flatMap, map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { FavoriteProtocol, FavoriteProtocolsData, Protocol } from './../model';
import { SepApiService } from './sep-api.service';
import { SepQuery } from './sep.query';
import { FavoriteProtocolStore } from './sep.store';

/**
 *
 *
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
    private protocolsStore: FavoriteProtocolStore,
    private sepQuery: SepQuery,
    private authQuery: AuthQuery
  ) {
    this.authQuery.isLoggedOut$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.protocolsStore.remove());

    this.sepQuery.favorites$
      .pipe(
        takeUntil(this.destroyed$),
        tap(favoriteProtocols => (this.favorites = favoriteProtocols)),
        filter(() => !this.protocolsStore.isPristine),
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
  getProtocol(protocolNumber: string): Observable<FavoriteProtocol> {
    this.showLoading();

    return this.api.getProtocol(protocolNumber).pipe(finalize(this.dismissLoading));
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
  loadFavorites = () => this.api.getFavoriteProtocols().pipe(map(f => f.protocols), tap(this.storeFavoriteProtocols));

  /**
   *
   *
   */
  addFavorite = (protocol: Protocol): void => {
    this.protocolsStore.createOrReplace(protocol.number, this.mapFavorite(protocol));
    this.showMessage(`Acompanahando protocolo ${protocol.number}`);
  };

  /**
   *
   *
   */
  removeFavorite = (protocol: Protocol): void => {
    this.protocolsStore.remove(protocol.number);
    this.showMessage(`Acompanhamento ${protocol.number} removido`);
  };

  /**
   *
   *
   */
  syncFavorites = (protocols?: FavoriteProtocol[]): Observable<FavoriteProtocolsData> => {
    this.showLoading();

    return this.api
      .syncFavoriteProtocols({
        protocols,
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
    return this.protocolsStore.set(this.normalizeFavorites(data));
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
