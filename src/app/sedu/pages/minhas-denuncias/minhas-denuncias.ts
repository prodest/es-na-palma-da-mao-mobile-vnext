import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { SeduDenunciasApiService } from '../../providers';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';
import { Denuncia } from '../../model';

@IonicPage()
@Component({
  selector: 'page-minhas-denuncias',
  templateUrl: 'minhas-denuncias.html',
})
export class MinhasDenunciasPage {

  denuncias: Array<Denuncia> = [];
  denuncias$: Subject<Array<Denuncia>>;
  
  constructor(
    private api: SeduDenunciasApiService,
    public auth: AuthQuery,
    private navCtrl: NavController,
    public loadCtrl: LoadingController
  ) {
    this.denuncias$ = new Subject();
    this.denuncias$.next([]);
  }

  ionViewWillLoad() {
    const loading = this.presentLoading();
    this.api.getUserDemands(this.auth.state.claims.cpf)
    .subscribe((denuncias: Denuncia[]) => {
      // console.log(denuncias);
      this.denuncias$.next(denuncias);
      this.denuncias = denuncias;
      loading.dismiss();
    });

  }

  /**
   * Cria e inicializa um loading
   */
  presentLoading() {
    const loader = this.loadCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  date(date: string) {
    return (new Date(date)).toLocaleString();
  }

  showDemand(id: number) {
    const params = {
      demand: this.denuncias.find((demand) => demand.id === id)
    };
    this.navCtrl.push("DetalhesDenunciaPage", params);
  }

}
