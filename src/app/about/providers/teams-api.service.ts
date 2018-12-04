import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ANONYMOUS_HEADER, Environment, EnvVariables } from '@espm/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';

import { TeamMember } from './../model';

@Injectable()
export class TeamsApiService {
  /**
   *
   */
  constructor(private http: HttpClient, @Inject(EnvVariables) private env: Environment) {}

  /**
   *
   */
  getTeamMembers(): Observable<TeamMember[]> {
    return this.http
      .get<TeamMember[]>(`${this.env.api.espm}/about/team`, { headers: new HttpHeaders({ [ANONYMOUS_HEADER]: 'true' }) })
      .pipe(share());
  }
}
