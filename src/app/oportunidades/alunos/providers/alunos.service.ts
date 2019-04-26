import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { Concurso } from '../model';
import { share, finalize, tap } from 'rxjs/operators';
import { ConcursoFavorito } from '../model/concurso-favorito.mode';
import { LoadingController, Loading } from 'ionic-angular';
import { AlunosStore } from './alunos.store';
import { Curso } from '../model/curso.model';

/*
*
*/
@Injectable()
export class AlunoService {
  /**
   *
   */
  constructor(
    // private toastCtrl: ToastController,
    private store: AlunosStore,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    @Inject(EnvVariables) private env: Environment
  ) {}
  loading: Loading;
  allconcurso: Concurso[];
  /**
   *
   */
  getConcurso(id): Observable<Concurso> {
    return this.http.get<Concurso>(`${this.env.api.selecaoalunos}/${id}`).pipe(share());
  }

  getCursos(link): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${link}`).pipe(share());
  }
  /**
   *
   */
  loadAll = () => {
    this.showLoading();

    /*
    const concursos$ = this.authQuery.isLoggedIn
      ? forkJoin(this.getAllConcursos(), this.api.getFavorites()).pipe(map(markFavorites))
      : this.getAllConcursos();
*/
    const concursos$ = this.getAllConcursos();

    concursos$.pipe(finalize(() => this.dismissLoading())).subscribe(concursos => {
      this.store.set(concursos);
    });
  };

  /**
   *
   */
  loadConcurso = (id): void => {
    this.showLoading();
    this.getConcurso(id)
      .pipe(finalize(() => this.dismissLoading()), tap(concurso => this.store.upsert(concurso.id, concurso)))
      .subscribe();
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
  private dismissLoading = () => {
    if (this.loading) {
      this.loading.dismiss().catch(console.log);
      this.loading = null;
    }
  };
  /**
   *
   */
  getAllConcursos = (): Observable<Concurso[]> => {
    return this.http.get<Concurso[]>(this.env.api.selecaoalunos).pipe(share());
  };
  /**
   *
   */
  getFavorites = (): Observable<ConcursoFavorito> => {
    return this.http.get<ConcursoFavorito>(`${this.env.api.espm}/publicTender/data/favorite`).pipe(share());
  };
  syncFavorites = (favoritos): Observable<ConcursoFavorito> => {
    return this.http.post<ConcursoFavorito>(`${this.env.api.espm}/publicTender/data/favorite`, favoritos).pipe(share());
  };
}
