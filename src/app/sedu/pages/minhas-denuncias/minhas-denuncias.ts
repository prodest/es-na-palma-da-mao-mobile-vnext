import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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
    private navCtrl: NavController
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
    /* this.api.getDemandStatus()
    .subscribe((status: StatusDenuncia[]) => {
      this.statusDenuncia = status;
    }); */

    this.api.getUserDemands(this.auth.state.claims.subNovo)
    .subscribe((denuncias) => {
      this.denuncias$.next(denuncias);
      this.denuncias = denuncias;
    });

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
