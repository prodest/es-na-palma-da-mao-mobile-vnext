import { Injectable, OnDestroy } from '@angular/core';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, finalize, flatMap, pluck, takeUntil, filter, map } from 'rxjs/operators';

import { FavoriteProtocol, Protocol, FavoriteProtocolsData } from './../model';
import { SepApiService } from './sep-api.service';
import { FavoriteProtocolStore, SepQuery } from '.';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';

@Injectable()
export class SepService implements OnDestroy {
  loading: Loading;
  destroyed$ = new Subject();

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
    private authQuery: AuthQuery
  ) {
    this.sepQuery.favorites$
      .pipe(takeUntil(this.destroyed$), filter(() => !this.favoriteProtocolStore.isPristine), flatMap(this.syncFavorites))
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
  getProcessByNumber(protocolNumber: string): Observable<FavoriteProtocol> {
    this.showLoading();

    return this.api.getProcessByNumber(protocolNumber).pipe(finalize(this.dismissLoading));
  }

  loadFavorites = () => {
    if (this.authQuery.isLoggedIn) {
      this.api
        .getFavoriteProtocols()
        .pipe(map(p => p.favoriteProtocols))
        .subscribe(this.storeFavoriteProtocols);
    }
  };

  /**
   *
   *
   */
  addFavorite = (protocol: Protocol): Observable<FavoriteProtocol[]> => {
    let favoriteProtocol = this.mapFavorite(protocol);

    this.showLoading();

    this.favoriteProtocolStore.update(protocol.number);

    let addedFavorites = this.storage.getValue('favoriteProtocols');
    addedFavorites.splice(this.locationOf(protocol, addedFavorites), 0, favoriteProtocol);

    return this.syncFavorites(addedFavorites).pipe(
      finalize(this.dismissLoading),
      catchError(error => {
        this.showMessage('Erro ao adicionar acompanhamento. Tente novamente.');
        return _throw(error);
      })
    );
  };

  /**
   *
   *
   */
  removeFavorite = (protocol: Protocol): Observable<FavoriteProtocol[]> => {
    let favoriteProtocols = this.storage.getValue('favoriteProtocols').filter(p => p.number !== protocol.number);

    this.showLoading();

    return this.syncFavorites(favoriteProtocols).pipe(
      finalize(this.dismissLoading),
      catchError(error => {
        this.showMessage('Erro ao remover acompanhamento. Tente novamente.');
        return _throw(error);
      })
    );
  };

  /**
   *
   *
   */
  syncFavorites = (favoriteProtocols?: FavoriteProtocol[]): Observable<FavoriteProtocolsData> => {
    return this.api.syncFavoriteProtocols({
      favoriteProtocols: favoriteProtocols,
      date: new Date().toISOString()
    });
  };

  private storeFavoriteProtocols = (data: FavoriteProtocol[]) => this.favoriteProtocolStore.set(data);

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
      this.loading.dismiss().catch(console.log);
      this.loading = null;
    }
  };

  /**
   *
   *
   */
  private showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };

  /**
   *
   *
   */
  private locationOf(element: Protocol, array: FavoriteProtocol[], start?: number, end?: number) {
    start = start || 0;
    end = end === undefined ? array.length - 1 : end;
    let pivot = Math.floor((start + end) / 2);
    if (end < start || array[pivot].number === element.number) {
      return pivot + 1;
    }
    if (array[pivot].number < element.number) {
      return this.locationOf(element, array, pivot + 1, end);
    } else {
      return this.locationOf(element, array, start, pivot - 1);
    }
  }
}
