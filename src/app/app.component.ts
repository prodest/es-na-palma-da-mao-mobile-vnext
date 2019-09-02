import { Component, Inject, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { akitaDevtools, enableAkitaProdMode, akitaConfig } from '@datorama/akita';
import { AuthQuery, AuthService, Environment, EnvVariables, PushService } from '@espm/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FilePath } from '@ionic-native/file-path';
import { Nav, Platform, AlertController } from 'ionic-angular';
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
    private filePath: FilePath,
    private alertCtrl: AlertController,
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
    if (!(window as WindowWithIntent).plugins) { return resolve(null); }
    (window as WindowWithIntent).plugins.intentShim.getIntent(
      async data => {
        if (!data || !data.clipItems) {
          resolve(null);
          return;
        }
        const clip = data.clipItems[0];
        if (clip) {
          const path = await this.filePath.resolveNativePath(clip.uri);
          resolve(path);
          return;
        }
        resolve(null);
      },
      () => resolve(null)
    );
  });

  private resumeApplication = async () => {
    const clip = await this.getIntentClip();

    console.log({ clip })
    if (this.authQuery.isLoggedIn) {
      this.auth
        .refreshAccessTokenIfNeeded()
        .pipe(finalize(this.push.init))
        .subscribe(
          token => {
            console.log({ token });
            const navActive = this.nav.getActive();
            const activeNavName = navActive ? navActive.name : this.rootPage;
            const isEdocs = activeNavName === 'DocumentsToSendPage' || activeNavName === 'DocumentsToSendAddAddresseesPage';
            if (clip && !isEdocs) {
              this.nav.setRoot('DocumentsToSendPage', { filePath: clip });
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
      if (clip) {
        const alert = this.alertCtrl.create({
          title: 'Login necessário',
          message: 'Você precisa realizar o login para encaminhar um documento!',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Login',
              handler: () => {
                const alertDismiss = alert.dismiss();
                alertDismiss.then(() => {
                  this.nav.setRoot('LoginPage', { redirectTo: 'DocumentsToSendPage', filePath: clip })
                });
                return false;
              }
            }
          ]
        });
        alert.present();
      }
      this.push.init();
    }
  };
}
