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
  concursoo: Concurso;

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
    this.AlunosQuery.selectEntity(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(concurso => {
        this.concursoo = concurso;
      });
    this.AlunoService.loadConcurso(id);

    console.log('>>>>', this.concursoo);
    this.concurso = {
      id: 1,
      status: 'Encerrado',
      nome: 'FIC 2014/02',
      descricao: 'Programa Nacional de Acesso ao Ensino Técnico e Emprego - Formação Inicial e Continuada',
      tipo: 'FIC',
      datas: {
        nome: 'Inscrição',
        inicio: new Date('2014-06-30T13:00:00.000Z'),
        fim: new Date('2014-07-09T02:59:59.000Z')
      },
      anoBase: new Date('2014'),
      cursos: 'https://api.es.gov.br/selecao-aluno/concursos/1/cursos',
      listaCursos: [
        {
          id: 2167,
          nome: 'Auxiliar Administrativo',
          cargaHoraria: 180,
          vagas: 20,
          turno: 'M',
          dtInicio: new Date('2014-07-30 00:00:00'),
          dtFim: new Date('2014-09-30T03:00:00.000Z'),
          ofertante: 'SENAI ARAÇAS'
        },
        {
          id: 2166,
          nome: 'Auxiliar Administrativo ',
          cargaHoraria: 180,
          vagas: 20,
          turno: 'N',
          dtInicio: new Date('2014-07-30 00:00:00'),
          dtFim: new Date('2014-09-30T03:00:00.000Z'),
          ofertante: 'SENAI ARAÇAS'
        }
      ]
    };
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
    } else {
      this.AlunoService.toggleFavorite(concurso);
    }
  }
  /**
   *
   */
}
