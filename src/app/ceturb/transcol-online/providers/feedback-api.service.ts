import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService, Environment, EnvVariables } from '@espm/core';

import { FeedBack } from './../model';

@Injectable()
export class FeedBackApiService {
  public static $inject: string[] = ['$http', 'settings', 'authenticationService'];

  /**
   * Creates an instance of FeedBackApiService.
   * @param {IHttpService} http
   */
  constructor(private http: HttpClient, private authService: AuthService, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   *
   * @param {number} originId
   * @param {number} destinationId
   * @returns {Observable<any>}
   */
  saveFeedBack(feedback: FeedBack): Observable<any> {
    // preenche o usuário que reportou o feedback
    feedback.user = this.authService.user;

    return this.http.post(`${this.env.api.feedback}/demands`, {
      type: feedback.type,
      description: 'Transcol Online - FeedBack',
      approved: false,
      payload: feedback
    });
  }
}
