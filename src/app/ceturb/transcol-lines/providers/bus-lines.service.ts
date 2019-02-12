import { Injectable, OnDestroy } from '@angular/core';
import { AuthQuery } from '@espm/core';
import { AlertController, App, Loading, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { filter, finalize, flatMap, map, mapTo, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { BusLine, FavoriteLinesData } from './../model';
import { BusLinesQuery } from './bus-lines.query';
import { BusLinesStore } from './bus-lines.store';
import { CeturbApiService } from './ceturb-api.service';

/**
 *
 *
 */
@Injectable()
export class BusLinesService implements OnDestroy {
  loading: Loading;

  private destroyed$ = new Subject();

  get lines$() {
    return this.busLinesQuery.selectAll();
  }

  line$ = (lineNumber: number) => {
    return this.busLinesQuery.selectEntity(lineNumber);
  };

  /**
   *
   *
   */
  constructor(
    private api: CeturbApiService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private app: App,
    private authQuery: AuthQuery,
    private busLinesStore: BusLinesStore,
    private busLinesQuery: BusLinesQuery
  ) {
    // Remove as entities do BusLinesStore no caso do logout, para evitar problema com os favoritos.
    this.authQuery.isLoggedOut$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.busLinesStore.remove());

    // salva favoritos no server todas as vezes que os favoritos forem atualizados após o carregamento
    // inicial da loja
    this.busLinesQuery.favorites$
      .pipe(filter(() => !this.busLinesStore.isPristine), flatMap(this.saveFavorites), takeUntil(this.destroyed$))
      .subscribe();
  }

  /**
   *
   *
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   *
   *
   */
  loadAll = (): void => {
    this.showLoading();

    let lines$ = this.authQuery.isLoggedIn
      ? forkJoin(this.api.getLines(), this.api.getFavoriteLines()).pipe(map(this.markFavorites))
      : this.api.getLines();

    lines$.pipe(finalize(this.dismissLoading)).subscribe(this.storeLines);
  };

  /**
   *
   *
   */
  loadLineDetails = (lineNumber: string): Observable<BusLine> => {
    const { schedule, route } = this.busLinesQuery.getEntity(lineNumber);

    if (!schedule || !route) {
      this.showLoading();
    }

    return this.api
      .getLineDetails(lineNumber)
      .pipe(
        finalize(this.dismissLoading),
        tap(details => this.busLinesStore.update(lineNumber, details)),
        mapTo(this.busLinesQuery.getEntity(lineNumber))
      );
  };

  /**
   *
   *
   */
  toggleFavorite = (line: BusLine): BusLine => {
    if (!this.authQuery.isLoggedIn) {
      this.showAuthNeededModal();
    } else {
      this.busLinesStore.update(line.number, { isFavorite: !line.isFavorite });
      line = this.busLinesQuery.getEntity(line.number);
      this.showMessage(`Linha ${line.number} ${line.isFavorite ? 'adicionada aos' : 'removida dos'} favoritos`);
      return line;
    }
  };

  /**
   *
   *
   */
  private storeLines = (lines: BusLine[]) => this.busLinesStore.set(lines);

  /**
   *
   *
   */
  private saveFavorites = (favoriteLines: BusLine[]): Observable<FavoriteLinesData> => {
    return this.api.saveFavoriteLines({
      favoriteLines: favoriteLines.map(line => line.number),
      date: new Date().toISOString()
    });
  };

  /**
   *
   *
   */
  private showAuthNeededModal = () => {
    let alert = this.alertCtrl.create({
      title: 'Login necessário',
      message: 'Para favoritar uma linha transcol é preciso estar autenticado no <strong>ES na palma da mão</strong>.',
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
  private markFavorites = ([lines, favorites]: [BusLine[], FavoriteLinesData]): BusLine[] => {
    return lines.map(line => {
      return {
        ...line,
        isFavorite: favorites.favoriteLines.some(l => l == line.number)
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

  /**
   *
   *
   */
  showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };
}
