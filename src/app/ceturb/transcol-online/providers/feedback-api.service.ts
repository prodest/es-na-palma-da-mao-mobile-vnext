import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthQuery, Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';

import { FeedBack } from './../model';

@Injectable()
export class FeedBackApiService {
  /**
   *
   */
  constructor(private http: HttpClient, private authQuery: AuthQuery, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   *
   */
  saveFeedBack(feedback: FeedBack): Observable<any> {
    // preenche o usuário que reportou o feedback
    feedback.user = this.authQuery.state.user;

    return this.http.post(`${this.env.api.feedback}/demands`, {
      type: feedback.type,
      description: 'Transcol Online - FeedBack',
      approved: false,
      payload: feedback
    });
  }
}
