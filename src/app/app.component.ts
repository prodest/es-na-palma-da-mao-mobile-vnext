import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

@Component({
  templateUrl: 'app.component.html'
})
// tslint:disable-next-line:component-class-suffix
export class ESPM {
  rootPage: any = 'HomePage';

  /**
   *
   */
  constructor(platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform
      .ready()
      .then(this.initialize)
      .catch(console.error);
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
  };
}
