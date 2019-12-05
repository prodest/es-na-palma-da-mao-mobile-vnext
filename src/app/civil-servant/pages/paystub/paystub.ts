import { IPaystubLink } from './../../interfaces/link';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { PaystubApiService } from '../../providers/paystub.api.service';
import { AuthService, AcessoCidadaoClaims, LoadingService } from '@espm/core';
import { IPaystubProfile } from '../../interfaces';
import { Observable } from 'rxjs/Observable';
import { mergeMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@IonicPage({
  segment: 'contracheque'
})
@Component({
  selector: 'paystub',
  templateUrl: 'paystub.html'
})
export class PaystubPage implements OnInit {

  activeComponent: 'profile' | 'links' | 'download' = 'profile';
  profiles$: Observable<IPaystubProfile[]> = of([]);
  links$: Observable<IPaystubLink[]> = of([]);
  private currentUser: AcessoCidadaoClaims

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private api: PaystubApiService, private auth: AuthService, private loading: LoadingService) { }

  ngOnInit(): void {
    const loading = this.loading.show('Aguarde');
    this.auth.refreshAccessTokenIfNeeded()
      .pipe(mergeMap(() => this.auth.refreshUser()))
      .subscribe(user => {
        this.currentUser = user;
        this.getProfiles(loading);
      });
  }

  getProfiles(loading: Loading): void {
    this.profiles$ = this.api.getProfiles(this.currentUser.cpf).pipe(
      finalize(() => loading.dismiss())
    );
  }

  getLinks(profile: IPaystubProfile): void {
    const loading = this.loading.show('Aguarde');
    this.activeComponent = 'links';
    this.links$ = this.api.getLink(this.currentUser.cpf, profile.codigoPerfil, profile.numeroFuncionario).pipe(
      finalize(() => loading.dismiss())
    );
  }

}
