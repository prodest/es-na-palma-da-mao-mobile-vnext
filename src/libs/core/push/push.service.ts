import { PushData } from './model';
import { Inject, Injectable } from '@angular/core';
import { EnvVariables, Environment } from '@espm/core';
import { PushOptions, PushObject, NotificationEventResponse, RegistrationEventResponse, Push } from '@ionic-native/push';
import { App } from 'ionic-angular';
import { PushApiService } from './push.api.service';

@Injectable()
export class PushService {
  pushManager: PushObject;

  constructor(
    private app: App,
    private push: Push,
    private api: PushApiService,
    @Inject(EnvVariables) private env: Environment
  ) {}

  init = () => {
    let pushOptions: PushOptions = {
      android: {
        senderID: this.env.push.senderId,
        forceShow: this.env.push.forceShow,
        icon: this.env.push.defaultIcon,
        iconColor: this.env.push.defaultColor
      },
      ios: {
        alert: this.env.push.alert,
        badge: this.env.push.badge,
        sound: this.env.push.sound,
        fcmSandbox: this.env.push.fcmSandbox
      }
    };

    this.pushManager = this.push.init(pushOptions);

    if (this.pushManager.on) {
      this.pushManager
        .on('registration')
        .subscribe((data: RegistrationEventResponse) => this.api.registerUser(data.registrationId).subscribe());

      this.pushManager.on('notification').subscribe((data: NotificationEventResponse) => {
        if (!data.additionalData.foreround) {
          // TODO:
          this.notify(this.getJson(data.additionalData['appData']));
        }
      });
    }
  };

  unregister = (): Promise<any> => {
    console.log('unregister: ', this.pushManager);
    if (this.pushManager) {
      return this.pushManager.unregister();
    }
    return Promise.resolve();
  };

  /**
   *
   */
  notify(pushData: PushData): void {
    if (pushData && pushData.state) {
      this.app.getActiveNav().setRoot(pushData.state, pushData.params); // TODO: reload: true
    }
  }

  /**
   *
   */
  private getJson(data: any) {
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  }
}
