import { Component, Inject, NgZone, ViewChild } from '@angular/core';
import { akitaDevtools, enableAkitaProdMode } from '@datorama/akita';
import { Environment, EnvVariables, AuthQuery, AuthService, PushService } from '@espm/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform, Nav } from 'ionic-angular';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: 'app.component.html'
})
export class ESPMComponent {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = 'DashboardPage';

  /**
   *
   */
  constructor(
    private authQuery: AuthQuery,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private platform: Platform,
    private push: PushService,
    private auth: AuthService,
    ngZone: NgZone,
    @Inject(EnvVariables) environment: Environment
  ) {
    platform
      .ready()
      .then(this.initialize)
      .catch(console.error);

    if (!environment.production) {
      akitaDevtools(ngZone);
    }

    if (environment.production) {
      enableAkitaProdMode();
    }
  }

  /**
   *
   */
  private initialize = () => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#000');
    this.splashScreen.hide();

    this.platform.resume.toPromise().then(this.resumeApplication);
  };

  private resumeApplication = () => {
    this.authQuery.isLoggedIn$.toPromise().then(isLoggedIn => {
      if (isLoggedIn) {
        this.auth
          .refreshAccessTokenIfNeeded()
          .pipe(finalize(this.push.init))
          .toPromise()
          .catch(error => {
            if (error.message === 'no-token') {
              this.auth.logout().then(() => this.nav.setRoot(this.rootPage));
            } else {
              this.push.init();
              this.nav.setRoot(this.rootPage);
            }
          });
      } else {
        this.push.init();
      }
    });
  };
}
