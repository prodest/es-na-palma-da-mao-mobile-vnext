import { Component, Inject, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { akitaDevtools, enableAkitaProdMode, akitaConfig } from '@datorama/akita';
import { AuthQuery, AuthService, Environment, EnvVariables, PushService } from '@espm/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FilePath } from '@ionic-native/file-path';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { File, IFile } from '@ionic-native/file';
import { DocumentFile } from './edocs/state';


@Component({
  templateUrl: 'app.component.html'
})
export class ESPMComponent implements OnDestroy {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomeScreenPage';
  private myServicesPage: string = 'MyServicesPage';
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
    private file: File,
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
    if (!(window as any).plugins) { return resolve(null); }
    (window as any).plugins.intentShim.getIntent(
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

  private getDocFile(path: string): Promise<DocumentFile> {
    return new Promise((resolve, reject) => {
      return this.file.resolveLocalFilesystemUrl(path).then((response: any) => {
        response.file((file: IFile) => resolve({
          url: path,
          name: file.name,
          type: file.type
        }));
      }).catch(reject);
    });
  }

  private resumeApplication = async () => {
    const clip = await this.getIntentClip();

    if (this.authQuery.isLoggedIn) {
      this.auth
        .refreshAccessTokenIfNeeded()
        .pipe(finalize(this.push.init))
        .subscribe(
          async token => {
            const navActive = this.nav.getActive();
            const activeNavName = navActive ? navActive.name : this.rootPage;
            const isEdocs = activeNavName === 'DocumentsToSendPage';
            if (clip && !isEdocs) {
              const docFile = await this.getDocFile(clip);
              this.nav.setRoot(this.myServicesPage)
                .then(() => this.nav.push('DocumentsToSendPage', { docFile }));
              return;
            }
          },
          error => {
            if (error.message === 'no-token') {
              this.auth.logout().then(() => this.nav.setRoot(this.rootPage));
            } else {
              this.push.init();
              this.nav.setRoot(this.myServicesPage);
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
                alertDismiss
                  .then(() => this.nav.setRoot(this.myServicesPage))
                  .then(() => this.getDocFile(clip))
                  .then(docFile => {
                    this.nav.push('LoginPage', { redirectTo: 'DocumentsToSendPage', params: { docFile } });
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
