import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Concurso } from '../../dto/Concurso';
import { DtDetailsProvider } from '../../providers/dt-details/dt-details';
import { finalize } from 'rxjs/operators';
@IonicPage()
@Component({
  selector: 'espm-page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  concurso: Concurso;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public detailsProvide: DtDetailsProvider
  ) {}
  ionViewWillLoad() {
    this.concurso = this.navParams.data;
  }

  openLink(link) {
    window.open(link, '_system', 'location=yes');
  }
  async showclassificados(id) {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde, buscando classificados'
    });
    loader.present();
    this.detailsProvide
      .classificados(id)
      .pipe(
        finalize(() => {
          loader.dismiss();
        })
      )
      .subscribe(classificados => {
        this.navCtrl.push('ClassificacaoPage', classificados);
      });
  }
}
