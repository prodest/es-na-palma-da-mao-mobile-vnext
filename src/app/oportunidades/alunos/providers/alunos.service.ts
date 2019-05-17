import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { Concurso } from '../model';
import { share, finalize, map } from 'rxjs/operators';
import { LoadingController, Loading, ToastController } from 'ionic-angular';
import { Curso } from '../model/curso.model';
import { of } from 'rxjs/observable/of';
import { AlunosStore } from './alunos.store';
import { AlunosQuery } from './alunos.query';
import { AlunosApiService } from './alunos.api.service';

/*
*
*/
@Injectable()
export class AlunoService {
  constructor(
    private toastCtrl: ToastController,
    private store: AlunosStore,
    private loadingCtrl: LoadingController,
    private http: HttpClient,
    private query: AlunosQuery,
    private api: AlunosApiService,
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
  toggleFavorite(concurso: Concurso) {
    this.store.update(concurso.id, { favorito: !concurso.favorito });
    let favoritos = {
      idTender: this.getFavoritos(),
      date: new Date().toISOString()
    };
    this.api.syncFavorites(favoritos).subscribe();

    this.showMessage(`${concurso.nome} ${concurso.favorito ? 'removido dos' : 'adicionado aos'} favoritos`);
  }
  private getFavoritos() {
    let favoritos = [];
    of(
      this.query.getAll().map(c => {
        if (c.favorito) {
          favoritos.push(c.id);
        }
      })
    );
    return favoritos;
  }
  /**
   *
   */
  private showMessage = (message: string) => this.toastCtrl.create({ message, duration: 4000 }).present();

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
      .pipe(
        finalize(() => this.dismissLoading()),
        map(concurso => {
          this.store.upsert(concurso.id, concurso);
        })
      )
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
}
