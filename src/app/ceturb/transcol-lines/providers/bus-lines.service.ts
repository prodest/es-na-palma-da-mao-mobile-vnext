import { Injectable } from '@angular/core';
import { AuthQuery } from '@espm/core';
import { AlertController, App, Loading, LoadingController, ToastController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { filter, finalize, flatMap, map, tap } from 'rxjs/operators';

import { BusLine, BusLineDetails, FavoriteLinesData } from './../model';
import { CeturbApiService } from './ceturb-api.service';

/**
 *
 *
 */
@Injectable()
export class BusLinesService {
  loading: Loading;

  private lines$$ = new BehaviorSubject<BusLine[]>([]);

  get lines$(): Observable<BusLine[]> {
    return this.lines$$.asObservable();
  }

  /**
   *
   *
   */
  line$(lineNumber: string): Observable<BusLine> {
    return this.lines$.pipe(
      flatMap((lines: BusLine[]) => from(lines)),
      filter((line: BusLine) => !!line),
      filter((line: BusLine) => line.number === lineNumber)
    );
  }

  /**
   *
   *
   */
  get lines(): BusLine[] {
    return this.lines$$.getValue();
  }

  /**
   *
   *
   */
  get favorites(): string[] {
    return this.lines.filter(l => l.isFavorite).map(l => l.number);
  }

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
    private authQuery: AuthQuery
  ) {}

  /**
   *
   *
   */
  loadAll = (): void => {
    this.showLoading();

    let lines$ = this.authQuery.isLoggedIn
      ? forkJoin(this.api.getLines(), this.syncFavorites()).pipe(map(this.markFavorites))
      : this.api.getLines();

    lines$.pipe(finalize(this.dismissLoading)).subscribe(this.updateLines);
  };

  /**
   *
   *
   */
  getLineDetails = (lineNumber: string): Observable<BusLineDetails> => {
    this.showLoading();
    return this.api.getLineDetails(lineNumber).pipe(finalize(this.dismissLoading));
  };

  /**
   *
   *
   */
  toggleFavorite = (line: BusLine): Observable<BusLine[]> => {
    if (!this.authQuery.isLoggedIn) {
      return fromPromise(this.showAuthNeededModal());
    } else {
      // atualiza a lista de favoritos
      const newFavorites = line.isFavorite
        ? this.favorites.filter(l => l !== line.number)
        : [...this.favorites, line.number];

      this.showLoading();

      // sincroniza atualização na lista de favoritos
      return this.syncFavorites(newFavorites).pipe(
        finalize(this.dismissLoading),
        map(() => this.markFavorites([this.lines, newFavorites])),
        tap(() => {
          if (line.isFavorite) {
            this.showMessage(`Linha ${line.number} removida dos favoritos`);
          } else {
            this.showMessage(`Linha ${line.number} adicionada aos favoritos`);
          }
        }),
        tap(this.updateLines)
      );
    }
  };

  /**
   *
   *
   */
  private updateLines = (lines: BusLine[]) => {
    this.lines$$.next([...lines]);
  };

  /**
   *
   *
   */
  private syncFavorites = (favoriteLines?: string[]): Observable<string[]> => {
    const syncData: FavoriteLinesData = { favoriteLines: [], date: null };

    // novos dados sendo enviados para serem salvos
    if (favoriteLines) {
      syncData.favoriteLines = favoriteLines;
      syncData.date = new Date().toISOString();
    }

    return this.api.syncFavoriteLines(syncData).pipe(map((linesData: FavoriteLinesData) => linesData.favoriteLines));
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
  private markFavorites = ([lines, favorites]): BusLine[] => {
    return lines.map(line => {
      return {
        ...line,
        isFavorite: favorites.indexOf(line.number) !== -1
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
