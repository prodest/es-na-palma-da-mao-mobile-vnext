import { Injectable, OnDestroy } from '@angular/core';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, finalize, flatMap, takeUntil, filter, map } from 'rxjs/operators';

import { FavoriteProtocol, Protocol, FavoriteProtocolsData } from './../model';
import { SepApiService } from './sep-api.service';
import { FavoriteProtocolStore } from './sep.store';
import { SepQuery } from './sep.query';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';
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
  hasFavorite = false;

  /**
   *
   *
   */
  constructor(
    private api: SepApiService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authQuery: AuthQuery,
    private favoriteProtocolStore: FavoriteProtocolStore,
    private sepQuery: SepQuery
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
  getProtocolByNumber(protocolNumber: string): Observable<FavoriteProtocol> {
    this.showLoading();

    return this.api.getProcessByNumber(protocolNumber).pipe(finalize(this.dismissLoading));
  }

  hasFavorites = () => {
    return this.sepQuery.count$.takeUntil(this.destroyed$).subscribe(count => (this.hasFavorite = count > 0));
  };

  /*
   *
   */
  isFavorite = (protocolNumber: string) => {
    return this.sepQuery.isFavorite(protocolNumber);
  };

  /*
   *
   */
  loadFavorites = () => {
    if (this.authQuery.isLoggedIn) {
      this.api
        .getFavoriteProtocols()
        .pipe(map(p => p.favoriteProcess))
        .subscribe(this.storeFavoriteProtocols);
    }
  };

  /**
   *
   *
   */
  addFavorite = (protocol: Protocol): void => {
    this.favoriteProtocolStore.createOrReplace(protocol.number, this.mapFavorite(protocol));
    this.showMessage(`Protocolo ${protocol.number} removido dos favoritos`);
  };

  /**
   *
   *
   */
  removeFavorite = (protocol: Protocol): void => {
    this.favoriteProtocolStore.remove(protocol.number);
    this.showMessage(`Protocolo ${protocol.number} removido dos favoritos`);
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

  private storeFavoriteProtocols = (data: FavoriteProtocol[]) =>
    this.favoriteProtocolStore.set(this.normalizeFavorites(data));

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
        }
      })
      .filter((item, index, self) => self.findIndex(i => i.number === item.number) === index);
  };
}
