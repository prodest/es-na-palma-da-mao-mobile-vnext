import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { DtApiService } from '../../providers';
import { Concurso } from '../../model/';

@IonicPage({
  segment: 'concursos/:id'
})
@Component({
  selector: 'espm-dt-concurso-page',
  templateUrl: 'concurso.html'
})
export class ConcursoPage {
  concurso: Concurso;

  /**
   *
   */
  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private api: DtApiService
  ) {}

  /**
   *
   */
  ionViewWillLoad() {
    this.getConcurso(this.navParams.data.id);
  }

  /**
   *
   */
  getConcurso = (id: number) => {
    this.api.getConcurso(id).subscribe(concurso => (this.concurso = concurso));
  };

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
  favoritar(concurso) {
    console.log('CLICOU EM FAVORITOS!', concurso.favorito);
    this.api.setFavoritos(concurso);
    this.showMessage(`Concurso ${concurso.nome} ${concurso.favorito ? 'adicionada aos' : 'removida dos'} favoritos`);
    return concurso;
  }
  showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };
}
