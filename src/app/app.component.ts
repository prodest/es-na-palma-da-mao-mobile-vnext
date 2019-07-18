import { Component, Inject, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { akitaDevtools, enableAkitaProdMode, akitaConfig } from '@datorama/akita';
import { AuthQuery, AuthService, Environment, EnvVariables, PushService } from '@espm/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';


type WindowWithIntent = Window & {
  plugins: {
    intentShim: {
      getIntent: Function
    }
  }
};

@Component({
  templateUrl: 'app.component.html'
})
export class ESPMComponent implements OnDestroy {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'DashboardPage';
  private onResumeSub: Subscription;

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

    if (process.env.DEV_TOOLS) {
      akitaDevtools(ngZone);
    }

    if (environment.production) {
      enableAkitaProdMode();
    }

    akitaConfig({
      resettable: true
    });
  }

  /**
   *
   */
  ngOnDestroy() {
    // always unsubscribe your subscriptions to prevent leaks
    this.onResumeSub.unsubscribe();
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

    this.onResumeSub = this.platform.resume.subscribe(this.resumeApplication);
    this.resumeApplication();
  };

  private getIntentClip = () => new Promise<string>(resolve => {
    (window as WindowWithIntent).plugins.intentShim.getIntent(
      data => {
        if (!data || !data.clipItems) {
          resolve(null);
          return;
        }
        const clip = data.clipItems[0];
        if (clip) {
          resolve(clip.uri);
          return;
        }
        resolve(null);
      },
      () => resolve(null)
    );
  });

  private resumeApplication = async () => {
    const clip = await this.getIntentClip();
    if (this.authQuery.isLoggedIn) {
      this.auth
        .refreshAccessTokenIfNeeded()
        .pipe(finalize(this.push.init))
        .subscribe(
          () => {
            if (clip) {
              this.nav.setRoot('DocumentsToSendBasicPage', { filePath: clip });
              return;
            }
          },
          error => {
            if (error.message === 'no-token') {
              this.auth.logout().then(() => this.nav.setRoot(this.rootPage));
            } else {
              this.push.init();
              this.nav.setRoot(this.rootPage);
            }
          }
        );
    } else {
      this.push.init();
    }
  };
}
