import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Loading } from 'ionic-angular';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { tap, finalize, map } from 'rxjs/operators';
import { SelecaoStore } from './selecao.store';
import { SelecaoQuery } from './selecao.query';
import { AuthQuery } from '@espm/core';
import { Concurso } from '../model';
import { Observable } from 'rxjs/Observable';
import { SelecaoApiService } from './selecao.api.service';
import { of } from 'rxjs/observable/of';

const markFavorites = ([concursos, favorites = []]: [Concurso[], Concurso[]]): Concurso[] => {
  return concursos.map(concurso => {
    return {
      ...concurso,
      favorito: !!favorites.find(f => f.id === concurso.id)
    };
  });
};

@Injectable()
export class SelecaoService {
  /**
   *
   */
  constructor(
    private loadingCtrl: LoadingController,
    private authQuery: AuthQuery,
    private api: SelecaoApiService,
    private toastCtrl: ToastController,
    private store: SelecaoStore,
    private query: SelecaoQuery
  ) {}
  loading: Loading;
  allconcurso: Concurso[];

  /**
   *
   */
  loadConcurso = (id): void => {
    this.showLoading();
    this.api
      .getConcurso(id)
      .pipe(finalize(() => this.dismissLoading()), tap(concurso => this.store.upsert(concurso.id, concurso)))
      .subscribe();
  };

  /**
   *
   */
  loadAll = () => {
    this.showLoading();

    const concursos$ = this.authQuery.isLoggedIn
      ? forkJoin(this.getAllConcursos(), this.getFavoritos()).pipe(map(markFavorites))
      : this.getAllConcursos();

    concursos$.pipe(finalize(() => this.dismissLoading())).subscribe(concursos => this.store.set(concursos));
  };

  /**
   *
   */
  toggleFavorite(concurso: Concurso) {
    this.store.update(concurso.id, { favorito: !concurso.favorito });
    this.showMessage(`Acompanhando o Concurso ${concurso.nome}`);
  }

  /**
   *
   */
  private getFavoritos() {
    return of(this.query.getAll().filter(c => c.favorito));
  }

  /**
   *
   */
  private getAllConcursos = (): Observable<Concurso[]> => {
    return this.api.getAllConcursos();
  };

  /**
   *
   */
  private showMessage = (message: string) => this.toastCtrl.create({ message, duration: 4000 }).present();

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
