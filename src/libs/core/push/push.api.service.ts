import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { PushUser } from './model';
import { EnvVariables } from './../environment';
import { Environment } from './../environment/environment';
import { Device } from '@ionic-native/Device';
import { Observable } from 'rxjs/Observable';

const transformRequest = obj => {
  let str: string[] = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
};

@Injectable()
export class PushApiService {
  /**
   * Creates an instance of AuthService.
   */
  constructor(private http: HttpClient, private device: Device, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   */
  registerUser = (registrationId: string): Observable<PushUser> => {
    return this.http.post<PushUser>(`${this.env.api.push}/subscribe`, this.getPushUser(registrationId), {
      headers: new HttpHeaders({ Transparent: 'true' })
    });
  };

  /**
   *
   *
   */
  unregisterUser = (timeout?: number): Observable<any> => {
    return this.http.post(`${this.env.api.push}/unsubscribe`, this.getPushUser(), {
      headers: new HttpHeaders({ Transparent: 'true', timeout: timeout.toString() })
    });
  };

  /**
   *
   */
  private getPushUser(registrationId?: string) {
    let pushUser: PushUser = { user: this.device.uuid, secret: this.env.push.secret };

    if (registrationId) {
      pushUser.type = this.device.platform;
      pushUser.token = registrationId;
    }
    return transformRequest(pushUser);
  }
}
