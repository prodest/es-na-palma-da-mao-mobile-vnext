import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Concurso } from '../../model/';
import { AuthQuery, AuthNeededService } from '@espm/core';
import { SelecaoService, SelecaoQuery } from '../../providers';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@IonicPage({
  segment: 'concursos/:id'
})
@Component({
  selector: 'espm-dt-concurso-page',
  templateUrl: 'concurso.html'
})
export class ConcursoPage implements OnDestroy {
  private destroyed$ = new Subject();
  concurso: Concurso;

  /**
   *
   */
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private authQuery: AuthQuery,
    private selecaoService: SelecaoService,
    private selecaoQuery: SelecaoQuery,
    private authNeeded: AuthNeededService
  ) {}
/**
 * 
 */


  /**
   *
   */
  ionViewWillLoad() {
    this.selecaoQuery
      .selectEntity(this.navParams.data.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(concurso => (this.concurso = concurso));

    this.selecaoService.loadConcurso(this.navParams.data.id);
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
  showAreas(concurso: Concurso) {
    this.navCtrl.push('AreasPage', { idConcurso: concurso.id, nomeConcurso: concurso.nome, areas: concurso.areas });
  }
  /**
   *
   *
   */
  favoritar(concurso: Concurso) {
    if (!this.authQuery.isLoggedIn) {
      this.authNeeded.showAuthNeededModal();
    } else {
      this.selecaoService.toggleFavorite(concurso);
    }
  }
  /**
   *
   */
}
