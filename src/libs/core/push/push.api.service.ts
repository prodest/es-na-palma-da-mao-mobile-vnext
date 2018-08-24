import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PushUser } from './model';
import { Environment, EnvVariables } from '@espm/core';
import { Device } from '@ionic-native/device';
import { Observable } from 'rxjs/Observable';

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
    let pushUser: PushUser = { user: this.device.uuid };

    if (registrationId) {
      pushUser.type = this.device.platform.toLowerCase();
      pushUser.token = registrationId;
    }
    return pushUser;
  }
}
