import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { SeduDenunciasApiService } from '../../providers';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';

@IonicPage()
@Component({
  selector: 'page-minhas-denuncias',
  templateUrl: 'minhas-denuncias.html',
})
export class MinhasDenunciasPage {

  denuncias$: Subject<any>;

  constructor(
    private api: SeduDenunciasApiService,
    public auth: AuthQuery
  ) {
    this.denuncias$ = new Subject();
  }

  ionViewWillLoad() {
    this.api.getUserDemands(this.auth.state.claims.nome)
    .subscribe((denuncias) => {
      console.log(denuncias);
      this.denuncias$.next(denuncias);
    });
  }

  date(date: string) {
    return (new Date(date)).toLocaleString();
  }
}
