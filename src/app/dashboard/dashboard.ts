import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, App, AlertController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { AuthQuery } from '@espm/core';
import { tap, takeUntil } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  private destroyed$ = new Subject<boolean>();

  constructor(private appCtrl: App, private alertCtrl: AlertController, private authQuery: AuthQuery) {}

  /**
   *
   */
  ngOnInit() {
    this.authQuery.isLoggedIn$
      .pipe(tap(() => takeUntil(this.destroyed$)))
      .subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  /**
   *
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  /*
   *
   */
  openPage = (page: string, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.showAuthNeededModal();
    } else {
      this.appCtrl.getRootNav().setRoot(page);
    }
  };

  /**
   *
   *
   */
  private showAuthNeededModal = () => {
    let alert = this.alertCtrl.create({
      title: 'Login necessário',
      message: 'Você deve estar autenticado no <strong>ES na palma da mão</strong> para acessar essa funcionalidade.',
      buttons: [
        {
          text: 'Entendi',
          role: 'cancel'
        },
        {
          text: 'Autenticar',
          handler: () => {
            this.appCtrl
              .getRootNav()
              .push('LoginPage')
              .then(() => alert.dismiss());
            return false;
          }
        }
      ]
    });
    return alert.present();
  };
}
