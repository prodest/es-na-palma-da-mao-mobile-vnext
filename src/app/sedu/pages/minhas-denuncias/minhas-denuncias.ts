import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SeduDenunciasApiService } from '../../providers';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';

@IonicPage()
@Component({
  selector: 'page-minhas-denuncias',
  templateUrl: 'minhas-denuncias.html',
})
export class MinhasDenunciasPage {

  denuncias: Array<any>;
  denuncias$: Subject<Array<any>>;

  constructor(
    private api: SeduDenunciasApiService,
    public auth: AuthQuery,
    private navCtrl: NavController
  ) {
    this.denuncias$ = new Subject();
  }

  ionViewWillLoad() {
    this.api.getUserDemands(this.auth.state.claims.subNovo)
    .subscribe((denuncias) => {
      console.log(denuncias);
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
