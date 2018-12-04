import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { filter, map } from 'rxjs/operators';

import { JwtHelper } from '../jwt-helper';
import { Token } from '../models';
import { AuthState, AuthStore } from './auth.store';

@Injectable()
export class AuthQuery extends Query<AuthState> {
  user$ = this.select(auth => auth.claims);
  accessToken$ = this.select(auth => auth.accessToken);
  authChanged$ = this.accessToken$.pipe(map(token => this.isValid(token)));
  isLoggedIn$ = this.authChanged$.pipe(filter(valid => !!valid));
  isLoggedOut$ = this.authChanged$.pipe(filter(valid => !valid));

  /**
   *
   */
  get state(): AuthState {
    return this.getSnapshot();
  }

  /**
   *
   */
  get isLoggedIn(): boolean {
    return this.isValid(this.state.accessToken);
  }

  /**
   *
   */
  constructor(protected store: AuthStore, private jwt: JwtHelper) {
    super(store);
  }

  /**
   *
   */
  private isValid = (token: Token | null): boolean => token && !this.jwt.isTokenExpired(token);
}
