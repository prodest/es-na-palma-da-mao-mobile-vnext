import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { PaystubService } from '../../providers/paystub.service';
import { AuthService, AcessoCidadaoClaims, LoadingService } from '@espm/core';
import { IPaystubProfile, IPaystubLink, IPaystubYear, IPaystubMonth } from '../../interfaces';
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
  years$: Observable<IPaystubYear[]> = of([]);
  months$: Observable<IPaystubMonth[]> = of([]);
  currentUser: AcessoCidadaoClaims | undefined;
  currentProfile: IPaystubProfile | undefined;
  currentLink: IPaystubLink | undefined;
  currentYear: IPaystubYear | undefined;
  currentMonth: IPaystubMonth | undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private paystubService: PaystubService, private auth: AuthService, private loading: LoadingService) { }

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
    if (!this.currentUser) { return; }
    this.profiles$ = this.paystubService.getProfiles(this.currentUser.cpf).pipe(
      finalize(() => loading.dismiss())
    );
  }

  getLinks(profile?: IPaystubProfile): void {
    if (!profile) { return; }
    const loading = this.loading.show('Aguarde');
    this.activeComponent = 'links';
    this.currentProfile = profile;
    this.links$ = this.paystubService.getLink(this.currentUser.cpf, profile.codigoPerfil, profile.numeroFuncionario).pipe(
      finalize(() => loading.dismiss())
    );
  }

  getYears(link?: IPaystubLink): void {
    if (!this.currentProfile || !link) { return; }
    const loading = this.loading.show('Aguarde');
    const { numeroFuncionario } = this.currentProfile;
    const {
      numeroVinculo,
      numeroPensionista
    } = link;
    this.activeComponent = 'download';
    this.currentLink = link;
    this.years$ = this.paystubService.getYears(numeroFuncionario, numeroVinculo, numeroPensionista).pipe(
      finalize(() => loading.dismiss())
    );
  }

  getMonths(year?: IPaystubYear): void {
    if (!this.currentLink || !year) { return; }
    const loading = this.loading.show('Aguarde');
    const { numeroFuncionario } = this.currentProfile;
    const {
      numeroVinculo,
      numeroPensionista
    } = this.currentLink;
    this.activeComponent = 'download';
    this.currentYear = year;
    this.months$ = this.paystubService.getMonths(numeroFuncionario, numeroVinculo, year, numeroPensionista).pipe(
      finalize(() => loading.dismiss())
    );
  }

  getLeafs(month?: IPaystubMonth): void {
    if (!this.currentYear || !month) { return; }
    console.log('month selected = ' + month)
  }

}
