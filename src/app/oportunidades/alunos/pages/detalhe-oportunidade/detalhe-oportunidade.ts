import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Concurso } from '../../model';
import { AlunoService, AlunosQuery } from '../../providers';
import { Subject } from 'rxjs/Subject';
import { AuthQuery, AuthNeededService } from '@espm/core';
import { takeUntil } from 'rxjs/operators';

@IonicPage({
  segment: 'detalhe/:id'
})
@Component({
  selector: 'espm-detalhe-oportunidade-page',
  templateUrl: 'detalhe-oportunidade.html'
})
export class DetalheOportunidadePage implements OnDestroy {
  private destroyed$ = new Subject();
  concurso: Concurso;

  /**
   *
   */
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private authQuery: AuthQuery,
    private AlunoService: AlunoService,
    private AlunosQuery: AlunosQuery,
    private authNeeded: AuthNeededService
  ) {}

  /**
   *
   */

  ionViewDidLoad() {
    let id = this.navParams.data.id;
    this.AlunoService.loadConcurso(id);
    this.AlunosQuery.selectEntity(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(concurso => {
        this.concurso = concurso;
      });
    
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
   */
  openLink(link) {
    window.open(link, '_system', 'location=yes');
  }

  /**
   *
   showClassificados(concurso: Concurso) {
     this.navCtrl.push('ClassificacaoPage', { concurso });
    }
*/
  showCursos(concurso: Concurso) {
    this.navCtrl.push('CursosPage', { id: concurso.id });
  }
  /**
   *
   *
   */
  favoritar(concurso: Concurso) {
    if (!this.authQuery.isLoggedIn) {
      this.authNeeded.showAuthNeededModal();
    } /*else {
      this.AlunoService.toggleFavorite(concurso);
    }*/
  }
  /**
   *
   */
}
