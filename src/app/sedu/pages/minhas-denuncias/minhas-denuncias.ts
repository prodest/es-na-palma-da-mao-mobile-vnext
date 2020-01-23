import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { SeduDenunciasApiService } from '../../providers';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';
import { TipoDenuncia, Denuncia, PapelAutorDenuncia, StatusDenuncia } from '../../model';

@IonicPage()
@Component({
  selector: 'page-minhas-denuncias',
  templateUrl: 'minhas-denuncias.html',
})
export class MinhasDenunciasPage {

  denuncias: Array<Denuncia> = [];
  denuncias$: Subject<Array<Denuncia>>;

  tiposDenuncias: Array<TipoDenuncia>;
  papeisReclamantes: Array<PapelAutorDenuncia>;
  statusDenuncia: Array<StatusDenuncia>;
  
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

    // carrega tipos de denuncias
    this.api.getDemandTypes()
    .subscribe((tipos: TipoDenuncia[]) => {
      this.tiposDenuncias = tipos
    });

    // carrega papeis dos autores de reclamação/denuncia
    this.api.getRoles()
    .subscribe((papeis: PapelAutorDenuncia[]) => {
      this.papeisReclamantes = papeis;
    });

    // carrega status de denuncias
    this.api.getDemandStatus()
    .subscribe((status: StatusDenuncia[]) => {
      // console.log(status);      
      this.statusDenuncia = status;
    });

    const loading = this.presentLoading();
    this.api.getUserDemands(this.auth.state.claims.subNovo)
    .subscribe((denuncias: Denuncia[]) => {
      // console.log(denuncias);
      denuncias.map((denuncia: Denuncia) => {
        denuncia.status = this.statusDenuncia.find((status: StatusDenuncia) => status.id === denuncia.statusId).nome;
        denuncia.tipoReclamacao = this.tiposDenuncias.find((tipo: TipoDenuncia) => tipo.id === denuncia.tipoReclamacao).nome;
      });
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
    let params = {
      demand: this.denuncias.find((demand) => demand.id === id)
    };
    this.navCtrl.push("DetalhesDenunciaPage", params);
  }

}
