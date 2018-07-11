import { Injectable } from '@angular/core';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { catchError, finalize, flatMap, pluck } from 'rxjs/operators';

import { FavoriteProtocol, Protocol } from './../model';
import { SepApiService } from './sep-api.service';
import { SepStorageModel } from './sep-storage.model';
import { SepStorage } from './sep-storage.service';

@Injectable()
export class SepService {
  loading: Loading;

  /**
   *
   *
   */
  constructor(
    private api: SepApiService,
    private storage: SepStorage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  get favoriteProtocols$(): Observable<FavoriteProtocol[]> {
    return this.storage.all$.pipe(pluck('favoriteProtocols'));
  }

  /**
   *
   *
   */
  isFavorite(protocol: Protocol): boolean {
    return this.storage.isFavorite(protocol);
  }

  /**
   *
   *
   */
  getProcessByNumber(protocolNumber: string): Observable<FavoriteProtocol> {
    this.showLoading();

    return this.api.getProcessByNumber(protocolNumber).pipe(finalize(this.dismissLoading));
  }

  /**
   *
   *
   */
  addFavorite = (protocol: Protocol): Observable<FavoriteProtocol[]> => {
    let favoriteProtocol = this.mapFavorite(protocol);

    this.showLoading();

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
  syncFavorites = (favoriteProtocols?: FavoriteProtocol[]): Observable<FavoriteProtocol[]> => {
    const syncData: SepStorageModel = { favoriteProtocols: [], date: null };

    if (favoriteProtocols) {
      syncData.favoriteProtocols = favoriteProtocols;
      syncData.date = new Date().toISOString();
    }

    return this.api
      .syncFavoriteProtocols(syncData)
      .pipe(
        flatMap((favoriteProtocols: SepStorageModel) =>
          this.storage.mergeValue('favoriteProtocols', favoriteProtocols.favoriteProtocols)
        )
      );
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
